const prompt = require("prompt-sync")();

let alunos = [];

let opcao;
do {
    console.log("\n=== MENU ===");
    console.log("1 - Cadastrar aluno");
    console.log("2 - Listar alunos");
    console.log("3 - Buscar aluno pelo nome");
    console.log("4 - Mostrar alunos aprovados");
    console.log("5 - Mostrar média geral da turma");
    console.log("0 - Sair");
    opcao = Number(prompt("Escolha uma opção: "));
    switch (opcao) {
        case 1:
            cadastrar();
            break;
        case 2:
            listar(alunos);
            break;
        case 3:
            listar(buscar());
            break;
        case 4:
            listar(aprovados());
            break;
        case 5:
            mediaGeral();
            break;
        case 0:
            console.log("Programa encerrado.");
            break;
        default:
            console.log("Opção inválida.");
    }
} while (opcao !== 0);

function cadastrar() {
    let nome = prompt("Digite o nome: ");
    let idade = Number(prompt("Digite a idade: "));
    let curso = prompt("Digite o curso: ");
    let nota1 = Number(prompt("Digite a primeira nota: "));
    let nota2 = Number(prompt("Digite a segunda nota: "));

    const aluno = {
        nome:nome,
        idade:idade,
        curso:curso,
        nota1:nota1,
        nota2:nota2
    };

    alunos.push(aluno);
}

function listar(alunos) {
    alunos.forEach(aluno => {
        console.log(`Nome: ${aluno.nome} | Idade: ${aluno.idade} anos | Curso: ${aluno.curso} | Média: ${calcularMedia(aluno)}`);
    });
}

function buscar() {
    let nomeBusca = prompt("Digite um nome");

    let resultado = alunos.filter(aluno => aluno.nome.includes(nomeBusca));

    if (resultado == null) {
        console.log("Não encontrado");
    } else {
        console.log(`Encontrado ${resultado.length} aluno(s)`);
    }

    return resultado;
}

function aprovados() {
    let aprovados = alunos.filter(aluno => calcularMedia(aluno) >= 7);

    return aprovados;
}

function calcularMedia(aluno) {
    let media = (aluno.nota1 + aluno.nota2) / 2;

    return media;
}

function mediaGeral() {
    let medias = alunos.map(aluno => calcularMedia(aluno));

    let somaMedias = medias.reduce((media, total) => total += media);

    console.log(`Média geral: ${somaMedias / medias.length}`);
}