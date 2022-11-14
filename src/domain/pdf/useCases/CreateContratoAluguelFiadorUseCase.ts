import { PdfProviderFiador } from '@utils/pdfProvider/pdf-provider-aluguel-fiador';
import { ContratoAluguelFiador } from '../dtos/contrato-aluguel-fiador';

export class CreateContratoAluguelFiadorUseCase {
    async execute(dataFiador: ContratoAluguelFiador): Promise<any> {
        const pdfProviderFiador = new PdfProviderFiador();

        const pdf = await pdfProviderFiador.generate(dataFiador);

        return pdf;
    }
}
