import { ContractDataDTO } from "../../domain/pdf/dtos/ContractDataDTO";
import { dateProvider } from "../dateProvider/dateProvider";
let ejs = require("ejs");
let path = require("path");
let pdf = require("html-pdf");
import { uploadProvider } from "../uploadProvider/uploadProvider";
//import jsPDF from "jspdf";
 
//const pdfMaker = require("pdf-maker");

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

        const pdfPath = `${process.env.PDF_PATH}`;
        
        ejs.renderFile(path.join(pathTemplate), data, (err: any, result: any) => {
            if(err) {
                throw new Error(err);
            }
            const options = {
                "format": "A4",
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                "height": "15mm"
                },
                "footer": {
                "height": "15mm",
                },
            };
            pdf.create(result, options).toFile(path.join(__dirname, process.env.PDF_PATH), (err: any, res: any) => {
                if(err) {
                    throw new Error(err);
                }
                console.log("PDF GERADO COM SUCESSO!");
            })
        })


        const fileUpload = await uploadProvider(pdfPath);

        
        return fileUpload;
    }
}