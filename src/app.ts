import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { pdfRouter } from './routes/pdf.routes';

export const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(pdfRouter)
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    return res.json('Application is running');
});