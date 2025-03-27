import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes/index.route';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

dotenv.config();

const port = process.env.PORT || 3001;
const app: Express = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cookieParser());

app.use(router);

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port} 🚀`);

    console.log(`🚀 API Docs available at http://localhost:${port}/api-docs 🚀`);
});