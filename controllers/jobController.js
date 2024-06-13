import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/jobModel.js";
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
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
    } = req.body;

    if (!title || !description || !category || !country || !city || !location) {
        return next(new ErrorHandler("Por favor proporcione detalles completos del trabajo.", 400));
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
        category,
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
        message: "Trabajo Publicado!",
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
        return next(new ErrorHandler("¡UPS! Trabajo no encontrado.", 404));
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Trabajo Actualizado!",
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
        return next(new ErrorHandler("¡UPS! Trabajo no encontrado.", 404));
    }
    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Trabajo Eliminado!",
    });
});

export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return next(new ErrorHandler("Trabajo no encontrado.", 404));
        }
        res.status(200).json({
            success: true,
            job,
        });
    } catch (error) {
        return next(new ErrorHandler(`Invalid ID / CastError`, 404));
    }
});