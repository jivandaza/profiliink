import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor, introduzca su nombre."],
        minLength: [3, "El nombre debe contener al menos 3 caracteres!"],
        maxLength: [30, "El nombre no puede exceder los 30 caracteres!"],
    },
    email: {
        type: String,
        required: [true, "Por favor, introduzca su correo electrónico."],
        validate: [validator.isEmail, "Por favor, introduzca un correo electrónico válido!"],
    },
    phone: {
        type: Number,
        required: [true, "Por favor, introduzca su número de teléfono."],
    },
    password: {
        type: String,
        required: [true, "Por favor, introduzca una contraseña."],
        minLength: [8, "La contraseña debe contener al menos 8 caracteres!"],
        maxLength: [32, "La contraseña no puede exceder los 32 caracteres!"],
        select: false,
    },
    role: {
        type: String,
        required: [true, "Por favor, seleccione un rol."],
        enum: ["Aspirante", "Empleador"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


//CIFRAR LA CONTRASEÑA CUANDO EL USUARIO SE REGISTRA O MODIFICA SU CONTRASEÑA
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//COMPARACIÓN DE LA CONTRASEÑA DE USUARIO INTRODUCIDA POR EL USUARIO CON LA CONTRASEÑA GUARDADA POR EL USUARIO
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//GENERAR UN TOKEN JWT CUANDO UN USUARIO SE REGISTRA O INICIA SESIÓN, DEPENDE DE NUESTRO CÓDIGO CUÁNDO NECESITAMOS GENERAR EL TOKEN JWT CUANDO EL USUARIO INICIA SESIÓN O SE REGISTRA O PARA AMBOS.
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.model("User", userSchema);