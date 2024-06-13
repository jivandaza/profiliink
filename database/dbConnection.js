import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: "potal-job",
        })
        .then(() => {
            console.log("Conectado a la base de datos.");
        })
        .catch((err) => {
            console.log(`Se produjo algún error: ${err}`);
        });
};