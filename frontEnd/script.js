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
            <img src="" alt="Arroz 5kg" />
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco}</p>
        <button onclick="adicionarAoCarrinho('${produto.nome}', ${produto.preco})">Adicionar ao carrinho</button>
        `;

        // Adiciona evento de clique para redirecionar para a página de detalhes
        // card.addEventListener("click", function () {
        //     informacoes(produto);
        // });

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

        // card.addEventListener("click", function () {
        //     informacoes(categoria);
        // });

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

  // Mostra no HTML (poderia ser modal depois)
  const mensagem = document.getElementById("mensagem-compra");
  mensagem.style.display = "block";
  mensagem.style.color = "#2d8b57";
  mensagem.style.fontWeight = "bold";
  mensagem.textContent = "✅ Compra finalizada com sucesso! Obrigado!";

  // Limpa carrinho
  carrinho = [];
  total = 0;
  atualizarCarrinho();

  // Também mostra alerta com resumo
  alert(resumo);
});

pesquisarProduto()
pequisarCategoria()