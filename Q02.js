const prompt = require("prompt-sync")();

let produtos = [];

let opcao;
do {
    console.log("\n=== MENU ===");
    console.log("1 - Cadastrar produto");
    console.log("2 - Listar produtos");
    console.log("3 - Buscar produto pelo código");
    console.log("4 - Adicionar estoque");
    console.log("5 - Retirar estoque");
    console.log("6 - Mostrar valor total do estoque");
    console.log("0 - Sair");
    opcao = Number(prompt("Escolha uma opção: "));
    switch (opcao) {
        case 1:
            cadastrar();
            break;
        case 2:
            listar(produtos);
            break;
        case 3:
            listar(buscar());
            break;
        case 4:
            adicionarEstoque();
            break;
        case 5:
            retirarEstoque();
            break;
        case 6:
            valorTotalEstoque();
            break;
        case 0:
            console.log("Programa encerrado.");
            break;
        default:
            console.log("Opção inválida.");
    }
} while (opcao !== 0);

function cadastrar() {
    let codigo = prompt("Digite o código: ");
    let nome = prompt("Digite o nome: ");
    let preco = Number(prompt("Digite o preço: "));
    let quantidade = Number(prompt("Digite a quantidade: "));

    if (produtos.some(produto => produto.codigo === codigo)) {
        console.log("Erro: código digitado existente no estoque");
    } else {
        const produto = {
            codigo: codigo,
            nome: nome,
            preco: preco,
            quantidade: quantidade
        };

        produtos.push(produto);
    }
}

function listar(produtos) {
    produtos.forEach(produto => {
        console.log(`Código: ${produto.codigo} | Nome: ${produto.nome} | Preço: R$${produto.preco} | Quantidade: ${produto.quantidade} unidades`);
    });
}

function buscar() {
    let codigo = prompt("Digite o código: ");

    let resultado = produtos.find(produto => produto.codigo === codigo);

    return resultado;
}

function adicionarEstoque() {
    let produto = buscar();

    let quantidade = Number(prompt("Digite a quantidade para adicionar: "));

    produto.quantidade += quantidade;
}

function retirarEstoque() {
    let produto = buscar();

    let quantidade = Number(prompt("Digite a quantidade para retirar: "));


    if (quantidade > produto.quantidade) {
        console.log("Erro: quantidade no estoque menor que a solicitada para retirar")
    } else {
        produto.quantidade -= quantidade;
    }
}

function valorProduto(produto) {
    return produto.preco * produto.quantidade;
}

function valorTotalEstoque() {
    let valorTotal = produtos.reduce(function (total, produto) {
        return total += valorProduto(produto)
    }, 0);

    console.log(`Valor total: R$${valorTotal}`);
}