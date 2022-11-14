import puppeteer from 'puppeteer';
import { uploadProvider } from '../uploadProvider/uploadProvider';
import { dateProvider } from '@utils/dateProvider/dateProvider';
import { ContratoAluguelFiador } from '@domain/pdf/dtos/contrato-aluguel-fiador';

let ejs = require('ejs');
let path = require('path');
export class PdfProviderFiador {
    async generate(dataFiador: ContratoAluguelFiador): Promise<any> {
        const pathTemplate = process.env.TEMPLATE_PATH;

        const pdfPathFiador = `./src/domain/pdf/views/aluguel-fiador/contrato-locacao-fiador.pdf`;

        const dataLocacaoFiador = dataFiador as ContratoAluguelFiador;
        dataFiador.date = dateProvider.date;

        try {
            const pdf = await ejs.renderFile(
                path.join(
                    './src/domain/pdf/views/aluguel-fiador/contrato-locacao-fiador.ejs'
                ),
                dataLocacaoFiador
            );
            const browser = await puppeteer.launch({
                // executablePath: '/usr/bin/chromium-browser',
            });

            const page = await browser.newPage();

            await page.setContent(pdf);

            await page.pdf({
                path: pdfPathFiador,
                format: 'A4',
                margin: {
                    top: '60px',
                    bottom: '20px',
                    left: '60px',
                    right: '60px',
                },
            });
            console.log('PDF Gerado fiador');
            //const uploadPDF = await uploadProvider(pdfPathCaucao);
            //return uploadPDF;
        } catch (error) {
            console.log(error);
        }
    }
}
