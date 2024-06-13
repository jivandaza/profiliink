import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Por favor, introduzca un título."],
        minLength: [3, "El título debe contener al menos 3 caracteres!"],
        maxLength: [30, "El título no puede exceder los 30 caracteres!"],
    },
    description: {
        type: String,
        required: [true, "Por favor, introduzca una descripción."],
        minLength: [30, "La descripción debe contener al menos 30 caracteres!"],
        maxLength: [500, "La descripción no puede exceder los 500 caracteres!"],
    },
    category: {
        type: String,
        required: [true, "Por favor, introduzca una categoría."],
    },
    country: {
        type: String,
        required: [true, "Por favor, introduzca un país."],
    },
    city: {
        type: String,
        required: [true, "Por favor, introduzca una ciudad."],
    },
    location: {
        type: String,
        required: [true, "Por favor, introduzca una ubicación."],
        minLength: [20, "La ubicación debe contener al menos 20 caracteres!"],
    },
    fixedSalary: {
        type: Number,
        minLength: [4, "El salario debe contener al menos 4 dígitos"],
        maxLength: [9, "El salario no puede exceder los 9 dígitos"],
    },
    salaryFrom: {
        type: Number,
        minLength: [4, "El salario debe contener al menos 4 dígitos"],
        maxLength: [9, "El salario no puede exceder los 9 dígitos"],
    },
    salaryTo: {
        type: Number,
        minLength: [4, "El salario debe contener al menos 4 dígitos"],
        maxLength: [9, "El salario no puede exceder los 9 dígitos"],
    },
    expired: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

export const Job = mongoose.model("Job", jobSchema);