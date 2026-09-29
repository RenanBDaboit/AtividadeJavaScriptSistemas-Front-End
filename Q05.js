const prompt = require("prompt-sync")();

let movimentacoes = [];

let id = 1;

let opcao;
do {
    console.log("\n=== MENU ===");
    console.log("1 - Registrar receita");
    console.log("2 - Registrar despesa");
    console.log("3 - Listar movimentações");
    console.log("4 - Mostrar total de receitas");
    console.log("5 - Mostrar total de despesas");
    console.log("6 - Mostrar saldo");
    console.log("7 - Buscar movimentação pelo ID");
    console.log("8 - Remover movimentação");
    console.log("0 - Sair");
    opcao = Number(prompt("Escolha uma opção: "));
    switch (opcao) {
        case 1:
            registrarReceita();
            break;
        case 2:
            registrarDespesa();
            break;
        case 3:
            listar(movimentacoes);
            break;
        case 4:
            console.log(`Total em receitas: R$${totalReceitas()}`);
            break;
        case 5:
            console.log(`Total em despesas: R$${totalDespesas()}`);
            break;
        case 6:
            console.log(`Saldo: R$${saldo()}`);
            break;
        case 7:
            exibir(buscar());
            break;
        case 8:
            movimentacoes = remover(movimentacoes);
            break;
        case 0:
            console.log("Programa encerrado.");
            break;
        default:
            console.log("Opção inválida.");
    }
} while (opcao !== 0);

function registrarReceita() {
    let descricao = prompt("Digite a descrição: ");
    let valor = Number(prompt("Digite o valor: "));

    const movimentacao = {
        id: id++,
        descricao: descricao,
        tipo: "RECEITA",
        valor: valor
    }

    movimentacoes.push(movimentacao);
}

function registrarDespesa() {
    let descricao = prompt("Digite a descrição: ");
    let valor = Number(prompt("Digite o valor: "));

    const movimentacao = {
        id: id++,
        descricao: descricao,
        tipo: "DESPESA",
        valor: valor
    }

    movimentacoes.push(movimentacao);
}

function listar(movimentacoes) {
    movimentacoes.forEach(movimentacao => {
        exibir(movimentacao);
    });
}

function exibir(movimentacao) {
    if (movimentacao == null) {
        console.log("Erro: Movimentação não encontrada");
    } else {
        console.log(`ID: ${movimentacao.id} | Descrição: ${movimentacao.descricao} | Tipo: ${movimentacao.tipo} | Valor: R$${movimentacao.valor}`);
    }
}

function totalReceitas() {
    let receitas = movimentacoes.filter(movimentacao => movimentacao.tipo === "RECEITA");

    let total = receitas.reduce(function (total, movimentacao) {
        return total += movimentacao.valor;
    }, 0);

    return total;
}

function totalDespesas() {
    let despesas = movimentacoes.filter(movimentacao => movimentacao.tipo === "DESPESA");

    let total = despesas.reduce(function (total, movimentacao) {
        return total += movimentacao.valor;
    }, 0);

    return total;
}

function saldo() {
    return totalReceitas() - totalDespesas();
}

function buscar() {
    let id = Number(prompt("Digite o ID: "));

    let movimentacao = movimentacoes.find(movimentacao => movimentacao.id === id);

    return movimentacao;
}

function remover(movimentacoes) {
    let movimentacaoRemover = buscar();

    if (movimentacaoRemover) {
        let indice = movimentacoes.findIndex(movimentacao => movimentacao.id === movimentacaoRemover.id)

        movimentacoes.splice(indice, 1);
    } else {
        console.log("Movimentação não encontrada");
    }

    return movimentacoes;
}