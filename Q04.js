const prompt = require("prompt-sync")();

const cardapio = [
    { codigo: 1, nome: "X-Burger", preco: 18 },
    { codigo: 2, nome: "X-Salada", preco: 22 },
    { codigo: 3, nome: "Batata Frita", preco: 15 },
    { codigo: 4, nome: "Refrigerante", preco: 7 }
];

let pedidos = [];
let numero = 1;

let opcao;
do {
    console.log("\n\n=== MENU ===");
    console.log("1 - Mostrar cardápio");
    console.log("2 - Criar pedido");
    console.log("3 - Listar pedidos");
    console.log("4 - Buscar pedido pelo número");
    console.log("5 - Mostrar faturamento total");
    console.log("0 - Sair");
    opcao = Number(prompt("Escolha uma opção: "));
    switch (opcao) {
        case 1:
            listarCardapio();
            break;
        case 2:
            cadastrar();
            break;
        case 3:
            listar(pedidos);
            break;
        case 4:
            exibirPedido(buscarPorNumero());
            break;
        case 5:
            faturamentoTotal();
            break;
        case 0:
            console.log("Programa encerrado.");
            break;
        default:
            console.log("Opção inválida.");
    }
} while (opcao !== 0);

function cadastrar() {
    let cliente = prompt("Digite o nome: ");
    let itens = [];

    let codigo;
    do {
        console.log("\n\n\n");
        listarCardapio();
        console.log("0 ===> Sair");

        codigo = Number(prompt("Digite o código do item: "));

        if (codigo !== 0) {
            let item = buscar(codigo);

            let quantidade = Number(prompt("Digite a quantidade do item desejado: "));

            itens.push({
                produto: item,
                quantidade: quantidade,
                subtotal: (item.preco * quantidade)
            });

        } else {
            console.log("Saindo do cardápio");
        }
    } while (codigo !== 0);

    const pedido = {
        numero: numero++,
        cliente: cliente,
        itens: itens,
        total: itens.reduce(function (total, item) {return total += item.subtotal}, 0)
    }

    pedidos.push(pedido);
}

function listarCardapio() {
    cardapio.forEach(produto => {
        exibirCardapio(produto);
    });
}

function buscar(codigo) {
    let item = cardapio.find(item => item.codigo == codigo);

    return item;
}

function listar(pedidos) {
    pedidos.forEach(pedido => {
        exibirPedido(pedido);
    });
}

function exibirPedido(pedido) {
    if (pedido == null) {
        console.log("Erro: Nenhum pedido cadastrado");
    } else {
        let itens = pedido.itens.map(item => exibirItens(item));

        console.log(`Número: ${pedido.numero} | Cliente: ${pedido.cliente}\n| Itens: \n${itens}| Total: R$${pedido.total}`);
    }
}

function exibirItens(item) {
    let produtos = exibirProduto(item.produto);

    return `\n\t| Produto: ${produtos} \n\t| Quantidade: ${item.quantidade}\n\t| Subtotal: R$${item.subtotal}\n`;
}

function exibirProduto(produto) {
    return `Código: ${produto.codigo} | Nome: ${produto.nome} | Preço: R$${produto.preco}`;
}

function exibirCardapio(produto) {
    console.log(`Código: ${produto.codigo} | Nome: ${produto.nome} | Preço: R$${produto.preco}`);
}

function buscarPorNumero() {
    let numero = Number(prompt("Digite o número do pedido: "));
    
    let pedido = pedidos.find(pedido => pedido.numero == numero);

    return pedido;
}


function faturamentoTotal() {
    let total = pedidos.reduce(function (total, pedido) {
        return total += pedido.total;
    }, 0);

    console.log(`Faturamento total: R$${total}`);   
}