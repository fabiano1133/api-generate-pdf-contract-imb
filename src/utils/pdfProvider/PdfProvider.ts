import { ContractDataDTO } from "../../domain/pdf/dtos/ContractDataDTO";
import { dateProvider } from "../dateProvider/dateProvider";
import puppeteer, { Page } from "puppeteer";
import { uploadProvider } from "../uploadProvider/uploadProvider";

let ejs = require("ejs");
let path = require("path");
export class PdfProvider {
    async generate({
            valorMensalAluguelEscrito,
            finalidade,
            locador,
            cpfLocador,
            estadoCivilLocador,
            profissaoLocador,
            rgLocador,
            locatario,
            cpfLocatario,
            estadoCivilLocatario,
            profissaoLocatario,
            rgLocatario,
            nomeConjuge,
            cpfConjuge,
            objContrato,
            endObjeto,
            numObjeto,
            bairroObjeto,
            cidadeObjeto,
            ufObjeto,
            cepObjeto,
            nacionalidadeLocador,
            orgaoExpedidor,
            ufExpedicao,
            ruaLocador,
            numLocador,
            compLocador,
            bairroLocador,
            cepLocador,
            nacionalidadeLocatario,
            orgaoExpedidorLocatario,
            ufExpedicaoLocatario,
            ruaLocatario,
            numLocatario,
            compLocatario,
            bairroLocatario,
            ufLocatario,
            cepLocatario,
            cidadeLocatario,
            ufLocador,
            cidadeLocador,
            nomeCorretor,
            nacionalidadeCorretor,
            estadoCivilCorretor,
            profissaoCorretor,
            cpfCorretor,
            rgCorretor,
            orgaoExpedidorCorretor,
            ufExpedicaoCorretor,
            numCreci,
            ruaCorretor,
            numCorretor,
            cepCorretor,
            bairroCorretor,
            cidadeCorretor,
            ufCorretor,
            valorServicoCorretor,
            valorServicoEscrito,
            bancoCorretor,
            agCorretor,
            contaCorretor,
            pixCorretor,
            prazoVigencia,
            inicio,
            termino,
            valorMensal,
            vencimento,
            finalidadeLocacao,
            valorGarantiaCaucao,
            diaVencimento,
            ciaEletrica,
            bancoLocador,
            agLocador,
            contaLocador,
            titularConta,
            date,
        }: ContractDataDTO): Promise<any> {

        const pathTemplate = process.env.TEMPLATE_PATH;
            
        const pdfPath = `./src/domain/pdf/views/contrato-locacao.pdf`;

        const data = {
            valorMensalAluguelEscrito,
            finalidade,
            locador,
            cpfLocador,
            estadoCivilLocador,
            profissaoLocador,
            rgLocador,
            locatario,
            cpfLocatario,
            estadoCivilLocatario,
            profissaoLocatario,
            rgLocatario,
            nomeConjuge,
            cpfConjuge,
            objContrato,
            endObjeto,
            numObjeto,
            bairroObjeto,
            cidadeObjeto,
            ufObjeto,
            cepObjeto,
            nacionalidadeLocador,
            orgaoExpedidor,
            ufExpedicao,
            ruaLocador,
            numLocador,
            compLocador,
            bairroLocador,
            cepLocador,
            nacionalidadeLocatario,
            orgaoExpedidorLocatario,
            ufExpedicaoLocatario,
            ruaLocatario,
            numLocatario,
            compLocatario,
            bairroLocatario,
            ufLocatario,
            cepLocatario,
            cidadeLocatario,
            ufLocador,
            cidadeLocador,
            nomeCorretor,
            nacionalidadeCorretor,
            estadoCivilCorretor,
            profissaoCorretor,
            cpfCorretor,
            rgCorretor,
            orgaoExpedidorCorretor,
            ufExpedicaoCorretor,
            numCreci,
            ruaCorretor,
            numCorretor,
            cepCorretor,
            bairroCorretor,
            cidadeCorretor,
            ufCorretor,
            valorServicoCorretor,
            valorServicoEscrito,
            bancoCorretor,
            agCorretor,
            contaCorretor,
            pixCorretor,
            prazoVigencia,
            inicio,
            termino,
            valorMensal,
            vencimento,
            finalidadeLocacao,
            valorGarantiaCaucao,
            diaVencimento,
            ciaEletrica,
            bancoLocador,
            agLocador,
            contaLocador,
            titularConta,
            date: dateProvider.date
        }
        
        
        const pdf = await ejs.renderFile(path.join("./src/domain/pdf/views/pdf-generated.ejs"), data)

        try {
            const browser = await puppeteer.launch({
                //executablePath: '/usr/bin/chromium-browser'
            });

            const page = await browser.newPage();

            await page.setContent(pdf);

            await page.pdf({
                path: pdfPath,
                format: 'A4',
                margin: {
                    top: '60px',
                    bottom: '20px',
                    left: '40px',
                    right: '40px'
                }
            });

            const uploadPDF = await uploadProvider(pdfPath);
            console.log("PDF gerado com sucesso!");
            return uploadPDF;
        
        } catch (error) {
            console.log(error);
        }
    }
}



