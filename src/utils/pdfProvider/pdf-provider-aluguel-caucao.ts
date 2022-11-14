import { ContratoAluguelCaucao } from '../../domain/pdf/dtos/contrato-aluguel-caucao';
import puppeteer from 'puppeteer';
import { uploadProvider } from '../uploadProvider/uploadProvider';
import { dateProvider } from '@utils/dateProvider/dateProvider';

let ejs = require('ejs');
let path = require('path');
export class PdfProviderCaucao {
    async generate(dataCaucao: ContratoAluguelCaucao): Promise<any> {
        const pathTemplate = process.env.TEMPLATE_PATH;

        const pdfPathCaucao = `./src/domain/pdf/views/aluguel-caucao/contrato-locacao-caucao.pdf`;

        const dataLocacaoCaucao = dataCaucao as ContratoAluguelCaucao;
        dataCaucao.date = dateProvider.date;

        try {
            const pdf = await ejs.renderFile(
                path.join(
                    './src/domain/pdf/views/aluguel-caucao/contrato-locacao-caucao.ejs'
                ),
                dataLocacaoCaucao
            );
            const browser = await puppeteer.launch({
                // executablePath: '/usr/bin/chromium-browser',
            });

            const page = await browser.newPage();

            await page.setContent(pdf);

            await page.pdf({
                path: pdfPathCaucao,
                format: 'A4',
                margin: {
                    top: '60px',
                    bottom: '20px',
                    left: '40px',
                    right: '40px',
                },
            });
            console.log('PDF Gerado caucao');
            //const uploadPDF = await uploadProvider(pdfPathCaucao);
            //return uploadPDF;
        } catch (error) {
            console.log(error);
        }
    }
}
