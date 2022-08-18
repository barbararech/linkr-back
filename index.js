import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
dotenv.config();

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server working on port ${PORT}`));
