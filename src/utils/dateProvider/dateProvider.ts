let date = new Date();
let dia = date.getDate().toString();
let mes = date.toLocaleString("pt-BR", { month: "long" });
let ano = date.getFullYear().toString();
let dataFormatada = `${dia} de ${mes} de ${ano}`;

export const dateProvider = {
    date: dataFormatada
}