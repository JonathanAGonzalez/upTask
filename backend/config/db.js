import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    const conection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `La conexión se realizó correctamente a la base de datos: ${conection.connection.name}`
    );
  } catch (error) {
    console.error(`error: ${error.message}`);
    //Forzar el cierre del proceso en caso que no podamos conectarnos a la base de datos
    process.exit(1);
  }
};

export default connectDB;
