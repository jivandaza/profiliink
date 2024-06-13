import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor, introduzca su nombre."],
        minLength: [3, "El nombre debe contener al menos 3 caracteres.!"],
        maxLength: [30, "El nombre no puede exceder los 30 caracteres!"],
    },
    email: {
        type: String,
        required: [true, "Por favor, introduzca su correo electrónico."],
        validate: [validator.isEmail, "Por favor, introduzca un correo electrónico válido!"],
    },
    coverLetter: {
        type: String,
        required: [true, "Por favor, proporcione una carta de presentación!"],
    },
    phone: {
        type: Number,
        required: [true, "Por favor, introduzca su número de teléfono!"],
    },
    address: {
        type: String,
        required: [true, "Por favor, introduzca su dirección!"],
    },
    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    applicantID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["Aspirante"],
            required: true,
        },
    },
    employerID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["Empleador"],
            required: true,
        },
    },
});

export const Application = mongoose.model("Application", applicationSchema);