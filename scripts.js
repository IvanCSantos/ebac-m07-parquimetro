class Parquimetro {
  constructor() {
    this.tabela = [
      [30, 1],
      [60, 1.75],
      [120, 3],
    ];
    this.inicializa();
  }

  inicializa() {
    const notasDisponiveis = [2, 5, 10, 20, 50, 100, 200];
    const optionsElement = document.getElementById("nota");

    notasDisponiveis.forEach((nota) => {
      const option = document.createElement("option");
      option.value = nota;
      option.text = `R$ ${nota},00`;
      optionsElement.appendChild(option);
    });
  }

  calculaValor(tempo) {
    const size = this.tabela.length - 1;
    for (let i = size; i >= 0; i--) {
      if (tempo >= this.tabela[i][0]) {
        return this.tabela[i][1];
      }
    }
    return 0;
  }

  calcularTroco(valorFornecido, custo) {
    return valorFornecido - custo;
  }

  verificarPagamento(valorFornecido, custo) {
    if (custo === 0) {
      return "Valor insuficiente";
    } else if (valorFornecido >= custo) {
      const troco = this.calcularTroco(valorFornecido, custo);
      return `Pagamento aceito. Troco: R$ ${troco
        .toFixed(2)
        .replace(".", ",")}`;
    } else {
      return "Pagamento recusado. Valor insuficiente.";
    }
  }

  exibeMensagem(mensagem) {
    const saida = (document.getElementById("mensagem").innerText = mensagem);
  }

  limpaInputs() {
    document.getElementById("tempo").value = null;
    document.getElementById("nota").value = 2;
  }

  executaCobranca(e) {
    e.preventDefault();

    const tempoUtilizado = parseInt(document.getElementById("tempo").value);
    const valorFornecido = parseInt(document.getElementById("nota").value);

    const custo = this.calculaValor(tempoUtilizado);
    const mensagem = this.verificarPagamento(valorFornecido, custo);
    this.exibeMensagem(mensagem);

    this.limpaInputs();
  }
}

const parquimetro = new Parquimetro();
document
  .getElementById("processar")
  .addEventListener("click", (e) => parquimetro.executaCobranca(e));
