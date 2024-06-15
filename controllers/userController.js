import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
    const { name, email, phone, habilidad, password, role } = req.body;
    if (!name || !email || !phone || !password || !role) {
        return next(new ErrorHandler("Por favor, introduzca todos los campos!"));
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler("Correo electrónico ya registrado!"));
    }
    const user = await User.create({
        name,
        email,
        phone,
        habilidad,
        password,
        role,
    });
    sendToken(user, 201, res, "Usuario Registrado");
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new ErrorHandler("Por favor, introduzca su correo electrónico, contraseña y rol."));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Correo electrónico o contraseña no coincide.", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Correo electrónico o contraseña no coincide.", 400));
    }
    if (user.role !== role) {
        return next(
            new ErrorHandler(`Usuario con correo electrónico proporcionado y ${role} no encontrado!`, 404)
        );
    }
    sendToken(user, 201, res, "Iniciando Sesión...");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
    res
        .status(201)
        .cookie("token", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Cerrando Sesión...",
        });
});

export const getUser = catchAsyncErrors((req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const getUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    });
});