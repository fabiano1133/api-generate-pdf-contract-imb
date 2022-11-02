import { Router } from "express";
import { GeneratePdfController } from "../domain/pdf/useCases/GeneratePdfController";
import AWS from 'aws-sdk'

export const pdfRouter = Router();

const generatePdfController = new GeneratePdfController();

pdfRouter.post('/pdf', generatePdfController.handle);

pdfRouter.get('/', (request, response) => {
    const message = 'Olá, sou uma API Externa';

    return response.json({ message });
})