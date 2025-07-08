import { ContratoAluguelCaucao } from '../../domain/pdf/dtos/contrato-aluguel-caucao';
import puppeteer from 'puppeteer';
import { uploadProvider } from '../uploadProvider/uploadProvider';
import { dateProvider } from '@utils/dateProvider/dateProvider';

let ejs = require('ejs');
let path = require('path');
export class PdfProviderCaucao {
    async generate(dataCaucao: ContratoAluguelCaucao): Promise<any> {
        const pathTemplate = process.env.TEMPLATE_PATH;

        const pdfPathCaucao = `${pathTemplate}/aluguel-caucao/contrato-locacao-caucao.pdf`;

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
                headless: 'new',
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-gpu',
                    '--disable-web-security',
                    '--disable-extensions',
                    '--no-first-run',
                    '--disable-default-apps',
                    '--disable-sync',
                    '--disable-translate',
                    '--disable-plugins',
                    '--disable-background-timer-throttling',
                    '--disable-renderer-backgrounding',
                    '--disable-backgrounding-occluded-windows',
                    '--disable-client-side-phishing-detection',
                    '--disable-ipc-flooding-protection'
                ],
                ignoreHTTPSErrors: true,
                timeout: 0
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
            
            await browser.close();
            console.log('PDF Gerado caucao');
            const uploadPDF = await uploadProvider(pdfPathCaucao);
            return uploadPDF;
        } catch (error) {
            console.log(error);
        }
    }
}
