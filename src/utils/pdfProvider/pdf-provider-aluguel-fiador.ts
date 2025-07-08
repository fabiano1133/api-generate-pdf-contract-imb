import puppeteer from 'puppeteer';
import { uploadProvider } from '../uploadProvider/uploadProvider';
import { dateProvider } from '@utils/dateProvider/dateProvider';
import { ContratoAluguelFiador } from '@domain/pdf/dtos/contrato-aluguel-fiador';

let ejs = require('ejs');
let path = require('path');
export class PdfProviderFiador {
    async generate(dataFiador: ContratoAluguelFiador): Promise<any> {
        const pathTemplate = process.env.TEMPLATE_PATH;

        const pdfPathFiador = `${pathTemplate}/aluguel-fiador/contrato-locacao-fiador.pdf`;

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
                path: pdfPathFiador,
                format: 'A4',
                margin: {
                    top: '60px',
                    bottom: '20px',
                    left: '60px',
                    right: '60px',
                },
            });
            
            await browser.close();
            console.log('PDF Gerado fiador');
            const uploadPDF = await uploadProvider(pdfPathFiador);
            return uploadPDF;
        } catch (error) {
            console.error('Erro ao gerar PDF fiador:', error);
            throw error;
        }
    }
}
