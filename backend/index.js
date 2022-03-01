import express, { json } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

const PORT = process.env.PORT || 4000;

//Routing
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server Up: localhost:${PORT}`);
});
