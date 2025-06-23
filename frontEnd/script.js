let carrinho = [];
let produtos = [];
let categorias = []
let total = 0;

async function pesquisarProduto(){
    const response = await fetch("http://localhost:8080/produtos");
    const data = await response.json();
    console.log(data)
    produtos = data
    renderProduto(produtos)
}

function renderProduto(produtos) {
    const container = document.querySelector(".produtos");

    if (!container) {
        console.error("Elemento '.produtos' não encontrado");
        return;
    }

    container.innerHTML = "";

    for (let produto of produtos) {
        let card = document.createElement("div");
        card.classList.add("produto");
        card.innerHTML = `
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco}</p>
        <button onclick="adicionarAoCarrinho('${produto.nome}', ${produto.preco})">Adicionar ao carrinho</button>
        `;

        container.appendChild(card);
    }
}

async function pequisarCategoria() {
  const response = await fetch("http://localhost:8080/categorias");
  const dataCategoria = await response.json();
  console.log(dataCategoria)
  categorias = dataCategoria
  renderCategoria(categorias)
}

function renderCategoria(categorias) {
    const container = document.querySelector(".categorias");

    if (!container) {
        console.error("Elemento '.produtos' não encontrado");
        return;
    }

    container.innerHTML = "";

    for (let categoria of categorias) {
        let card = document.createElement("li");
        card.classList.add("categorias");
        card.innerHTML = `
            <li><a href="#">${categoria.nome}</a></li>
        `;

        container.appendChild(card);
    }
}

function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  total += preco;
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const totalSpan = document.getElementById("total");

  lista.innerHTML = "";

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.nome} - R$ ${item.preco.toFixed(2)}
      <button class="remover" onclick="removerDoCarrinho(${index})">❌</button>
    `;

    lista.appendChild(li);
  });

  totalSpan.textContent = total.toFixed(2);
}

function removerDoCarrinho(index) {
  total -= carrinho[index].preco;
  carrinho.splice(index, 1);
  atualizarCarrinho();
}
document.getElementById("finalizar-compra").addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let resumo = "Resumo do pedido:\n\n";
  carrinho.forEach(item => {
    resumo += `• ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
  });
  resumo += `\nTotal: R$ ${total.toFixed(2)}`;

  const mensagem = document.getElementById("mensagem-compra");
  mensagem.style.display = "block";
  mensagem.style.color = "#2d8b57";
  mensagem.style.fontWeight = "bold";
  mensagem.textContent = "✅ Compra finalizada com sucesso! Obrigado!";
  inserirPagamento()

  carrinho = [];
  total = 0;
  atualizarCarrinho();

  alert(resumo);
});

async function inserirPagamento() {

    console.log("totalPrice:", total);

    var dadosPagamento = {
        total,
    };

    console.log(dadosPagamento);
    var resposta = await fetch("http://localhost:8080/pagamento", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(dadosPagamento),

    })

    var data = await resposta.json();
    console.log(data);
}

async function historic(){
    const response = await fetch("http://localhost:8080/historico");
    const dataPay = await response.json();

    console.log(dataPay)

    var idPagamento = []
    var dataPag = []
    var preco = []

    for(let campo of dataPay){
        idPagamento.push(campo.id).toString();
        dataPag.push(campo.data).toString();
        preco.push(campo.total).toString();
    }
    console.log(idPagamento, dataPag, preco)
let tabelaHTML = `
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>ID Pagamento</th>
        <th>Data</th>
        <th>Preço</th>
      </tr>
    </thead>
    <tbody>
`;

for (let i = 0; i < idPagamento.length; i++) {
  tabelaHTML += `
    <tr>
      <td>${idPagamento[i]}</td>
      <td>${dataPag[i]}</td>
      <td>${preco[i]}</td>
    </tr>
  `;
}

tabelaHTML += `</tbody></table>`;

Swal.fire({
  title: "Histórico de Pagamentos",
  html: tabelaHTML,
});
}

pesquisarProduto()
pequisarCategoria()