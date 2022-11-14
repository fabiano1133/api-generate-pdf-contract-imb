import { CreateContratoAluguelFiadorController } from '@domain/pdf/useCases/CreateContratoAluguelFiadorController';
import { Router } from 'express';
import { CreateContratoAluguelCaucaoController } from '../domain/pdf/useCases/CreateContratoAluguelCaucaoController';
export const pdfRouter = Router();

const generatePdfAluguelCaucao = new CreateContratoAluguelCaucaoController();
const generatePdfAluguelFiador = new CreateContratoAluguelFiadorController();

pdfRouter.post('/contrato-aluguel-caucao', generatePdfAluguelCaucao.handle);
pdfRouter.post('/contrato-aluguel-fiador', generatePdfAluguelFiador.handle);

pdfRouter.get('/', (request, response) => {
    const message = 'Apliccation is running';

    return response.json({ message });
});
