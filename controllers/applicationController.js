import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js";
import cloudinary from "cloudinary";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Empleador") {
        return next(
            new ErrorHandler("El empleador no tiene permiso para acceder a este recurso.", 400)
        );
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Reanudar archivo requerido!", 400));
    }

    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(resume.mimetype)) {
        return next(
            new ErrorHandler("Tipo de archivo invalido. Por favor, sube un archivo PNG.", 400)
        );
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(new ErrorHandler("No se pudo cargar el currículum en Cloudinary", 500));
    }
    const { name, email, coverLetter, phone, address, jobId } = req.body;
    const applicantID = {
        user: req.user._id,
        role: "Aspirante",
    };
    if (!jobId) {
        return next(new ErrorHandler("Trabajo no encontrado!", 404));
    }
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
        return next(new ErrorHandler("Trabajo no encontrado!", 404));
    }

    const employerID = {
        user: jobDetails.postedBy,
        role: "Empleador",
    };
    if (
        !name ||
        !email ||
        !coverLetter ||
        !phone ||
        !address ||
        !applicantID ||
        !employerID ||
        !resume
    ) {
        return next(new ErrorHandler("Por favor, llena todos los espacios.", 400));
    }
    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "Solicitud Presentada!",
        application,
    });
});

export const employerGetAllApplications = catchAsyncErrors(
    async (req, res, next) => {
        const { role } = req.user;
        if (role === "Aspirante") {
            return next(
                new ErrorHandler("El aspirante no tiene permiso para acceder a este recurso.", 400)
            );
        }
        const { _id } = req.user;
        const applications = await Application.find({ "employerID.user": _id });
        res.status(200).json({
            success: true,
            applications,
        });
    }
);

export const jobseekerGetAllApplications = catchAsyncErrors(
    async (req, res, next) => {
        const { role } = req.user;
        if (role === "Empleador") {
            return next(
                new ErrorHandler("El empleador no tiene permiso para acceder a este recurso.", 400)
            );
        }
        const { _id } = req.user;
        const applications = await Application.find({ "applicantID.user": _id });
        res.status(200).json({
            success: true,
            applications,
        });
    }
);

export const jobseekerDeleteApplication = catchAsyncErrors(
    async (req, res, next) => {
        const { role } = req.user;
        if (role === "Empleador") {
            return next(
                new ErrorHandler("El empleador no tiene permiso para acceder a este recurso.", 400)
            );
        }
        const { id } = req.params;
        const application = await Application.findById(id);
        if (!application) {
            return next(new ErrorHandler("Aplicación no encontrada!", 404));
        }
        await application.deleteOne();
        res.status(200).json({
            success: true,
            message: "Aplicación Eliminada!",
        });
    }
);