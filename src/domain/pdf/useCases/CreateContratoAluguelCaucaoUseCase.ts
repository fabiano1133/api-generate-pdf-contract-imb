import { PdfProviderCaucao } from '@utils/pdfProvider/pdf-provider-aluguel-caucao';
import {
    ContratoAluguelCaucao,
    ContratoAluguelCaucaoResponse,
} from '../dtos/contrato-aluguel-caucao';

export class CreateContratoAluguelCaucaoUseCase {
    async execute(
        dataCaucao: ContratoAluguelCaucao
    ): Promise<ContratoAluguelCaucaoResponse> {
        const pdfProvider = new PdfProviderCaucao();

        const pdf = await pdfProvider.generate(dataCaucao);

        return pdf;
    }
}
