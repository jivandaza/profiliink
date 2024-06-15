import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/jobModel.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
    const jobs = await Job.find({ expired: false });
    res.status(200).json({
        success: true,
        jobs,
    });
});

export const postJob = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Aspirante") {
        return next(
            new ErrorHandler("El aspirante no tiene permiso para acceder a este recurso.", 400)
        );
    }
    const {
        title,
        description,
        habilidad,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
    } = req.body;

    if (!title || !description || !habilidad || !country || !city || !location) {
        return next(new ErrorHandler("Por favor, proporcione detalles completos del trabajo.", 400));
    }

    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
        return next(
            new ErrorHandler(
                "Proporcione salario fijo o salario variable.",
                400
            )
        );
    }

    if (salaryFrom && salaryTo && fixedSalary) {
        return next(
            new ErrorHandler("No se puede ingresar el salario fijo y el salario variable juntos.", 400)
        );
    }
    const postedBy = req.user._id;
    const job = await Job.create({
        title,
        description,
        habilidad,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy,
    });
    res.status(200).json({
        success: true,
        message: "Publicación Creada!",
        job,
    });
});

export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Aspirante") {
        return next(
            new ErrorHandler("El aspirante no tiene permiso para acceder a este recurso.", 400)
        );
    }
    const myJobs = await Job.find({ postedBy: req.user._id });
    res.status(200).json({
        success: true,
        myJobs,
    });
});

export const updateJob = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Aspirante") {
        return next(
            new ErrorHandler("El aspirante no tiene permiso para acceder a este recurso.", 400)
        );
    }
    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("¡UPS! Publicación no encontrada.", 404));
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Publicación Actualizada!",
    });
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Aspirante") {
        return next(
            new ErrorHandler("El aspirante no tiene permiso para acceder a este recurso.", 400)
        );
    }
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("¡UPS! Publicación no encontrada.", 404));
    }
    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Publicación Eliminada!",
    });
});

export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return next(new ErrorHandler("Publicación no encontrada.", 404));
        }
        res.status(200).json({
            success: true,
            job,
        });
    } catch (error) {
        return next(new ErrorHandler(`Invalid ID / CastError`, 404));
    }
});

function calculateSimilarity(user, job, peso) {
    return user.habilidad * peso * job.habilidad;
}

function objectiveFunction(peso, users, jobs) {
    let total = 0;
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < jobs.length; j++) {
            total += Math.abs(1 - calculateSimilarity(users[i], jobs[j], peso));
        }
    }
    return total;
}

function optimizarPeso(objectiveFunction, pesoInicial, users, jobs) {
    let pesoOptimo = pesoInicial;
    let mejorObjetivo = objectiveFunction(pesoOptimo, users, jobs);

    for (let peso = 0.1; peso <= 2; peso += 0.1) {
        let objetivo = objectiveFunction(peso, users, jobs);
        if (objetivo < mejorObjetivo) {
            mejorObjetivo = objetivo;
            pesoOptimo = peso;
        }
    }

    return pesoOptimo;
}

// Función para obtener trabajos recomendados para un usuario
export const getRecommendedJobs = catchAsyncErrors( async (req, res, next) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const jobs = await Job.find();

    const users = await User.find({}, 'habilidad');

    // Pesos iniciales
    const pesoInicial = 1;

    // Optimización del peso
    const pesoOptimo = optimizarPeso(objectiveFunction, pesoInicial, users, jobs);

    // Recomendación de empleo para el usuario
    const recommendedJobs = [];
    jobs.forEach(job => {
        const similitud = calculateSimilarity(user, job, pesoOptimo);
        recommendedJobs.push({ job, similitud });
    });

    // Ordenar los trabajos recomendados por similitud descendente
    recommendedJobs.sort((a, b) => b.similitud - a.similitud);

    return res.json({
        jobs: recommendedJobs
    });
});