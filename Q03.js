const prompt = require("prompt-sync")();

let livros = [];

let opcao;
do {
    console.log("\n=== MENU ===");
    console.log("1 - Cadastrar livro");
    console.log("2 - Listar todos os livros");
    console.log("3 - Listar livros disponíveis");
    console.log("4 - Buscar livro pelo título");
    console.log("5 - Emprestar livro");
    console.log("6 - Devolver livro");
    console.log("0 - Sair");
    opcao = Number(prompt("Escolha uma opção: "));
    switch (opcao) {
        case 1:
            cadastrar();
            break;
        case 2:
            listar(livros);
            break;
        case 3:
            listar(listarDisponiveis());
            break;
        case 4:
            exibir(buscar());
            break;
        case 5:
            emprestar();
            break;
        case 6:
            devolver();
            break;
        case 0:
            console.log("Programa encerrado.");
            break;
        default:
            console.log("Opção inválida.");
    }
} while (opcao !== 0);

function cadastrar() {
    let titulo = prompt("Digite o título: ");
    let autor = prompt("Digite o autor: ");
    let ano = Number(prompt("Digite o ano: "));

    const livro = {
        titulo: titulo,
        autor: autor,
        ano: ano,
        disponivel: true
    }

    livros.push(livro);
}

function listar(livros) {
    livros.forEach(livro => {
        exibir(livro);
    });
}

function exibir(livro) {
    if (livro == null) {
        console.log("Erro: Livro não encontrado");
    } else {
        console.log(`Título: ${livro.titulo} | Autor: ${livro.autor} | Ano: ${livro.ano} | Disponivel: ${livro.disponivel}`);
    }
}

function listarDisponiveis() {
    let resultado = livros.filter(livro => livro.disponivel === true);

    return resultado;
}

function buscar() {
    let tituloBusca = prompt("Digite um titulo: ");

    let livro = livros.find(livro => livro.titulo.includes(tituloBusca));

    return livro;
}

function emprestar() {
    let livro = buscar();

    if (livro.disponivel == false) {
        console.log("Erro: Livro já emprestado");
    } else {
        livro.disponivel = false;
    }
}

function devolver() {
    let livro = buscar();

    if (livro.disponivel == true) {
        console.log("Erro: Livro já devolvido");
    } else {
        livro.disponivel = true;
    }
}