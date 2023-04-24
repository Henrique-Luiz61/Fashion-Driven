const nomeUsuario = prompt("Qual é o seu nome ?");

let tipoCamisa, tipoGola, tipoTecido, linkReferencia, textoLink;

let ultimosPedidos = [];

axios.defaults.headers.common["Authorization"] = "p3VJLB6nvGVsY41r5CrhIb9S";

function renderizarBlusasPedidas() {
  const divPedidos = document.querySelector(".ultimos-pedidos");
  divPedidos.innerHTML = "";

  console.log(ultimosPedidos);

  for (let i = 0; i < ultimosPedidos.length; i++) {
    if (ultimosPedidos[i].owner === "Henrique") {
      divPedidos.innerHTML += `<div class="produto-footer">
        <img src="${ultimosPedidos[i].image}">
        <p><strong>Criador:</strong> ${ultimosPedidos[i].owner}</p>
     </div>`;

      console.log(ultimosPedidos[i].image);
      console.log(ultimosPedidos[i].owner);
    }
  }
}

function buscarBlusas() {
  const promise = axios.get(
    "https://mock-api.driven.com.br/api/v4/shirts-api/shirts"
  );
  promise.then((res) => {
    console.log(res);
    console.log("tudo ok");

    ultimosPedidos = res.data;

    renderizarBlusasPedidas();
  });
  promise.catch((erro) => {
    console.log(erro);
    console.log("algo deu errado");
  });
}

buscarBlusas();

function liberarBotaoPedido() {
  if (
    tipoCamisa !== undefined &&
    tipoGola !== undefined &&
    tipoTecido !== undefined &&
    textoLink !== "" &&
    textoLink !== undefined
  ) {
    const botaoConfirmar = document.querySelector("button");
    botaoConfirmar.classList.add("botao-ativo");
    botaoConfirmar.removeAttribute("disabled");
  }
}

function selecionaCamisa(camisa) {
  const itemJaSelecionado = document.querySelector(
    ".tipos-camisas .selecionado"
  );

  if (itemJaSelecionado !== null) {
    itemJaSelecionado.classList.remove("selecionado");
  }

  camisa.classList.add("selecionado");

  tipoCamisa = camisa.querySelector(".descrição-roupa").innerHTML;

  liberarBotaoPedido();
}

function selecionaGola(gola) {
  let itemJaSelecionado = document.querySelector(".golas .selecionado");

  if (itemJaSelecionado !== null) {
    itemJaSelecionado.classList.remove("selecionado");
  }

  gola.classList.add("selecionado");

  tipoGola = gola.querySelector(".descrição-roupa").innerHTML;

  liberarBotaoPedido();
}

function selecionaTecido(tecido) {
  let itemJaSelecionado = document.querySelector(".tecidos .selecionado");

  if (itemJaSelecionado !== null) {
    itemJaSelecionado.classList.remove("selecionado");
  }

  tecido.classList.add("selecionado");

  tipoTecido = tecido.querySelector(".descrição-roupa").innerHTML;

  liberarBotaoPedido();
}

function pegarLink() {
  linkReferencia = document.querySelector("input");

  textoLink = document.querySelector("input").value;
  console.log(tipoCamisa);
  console.log(tipoGola);
  console.log(tipoTecido);
  console.log(textoLink);
  console.log(nomeUsuario);
  liberarBotaoPedido();
}

function confirmarEncomenda() {
  const objEncomenda = {
    model: tipoCamisa,
    neck: tipoGola,
    material: tipoTecido,
    image: textoLink,
    owner: "Henrique",
    author: nomeUsuario,
  };

  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v4/shirts-api/shirts",
    objEncomenda
  );

  promise.then((res) => {
    console.log(res);
    alert("Sua encomenda foi enviada com Sucesso!");
  });
  promise.catch((erro) => {
    console.log(erro);
    alert("Ops, não conseguimos processar sua encomenda!");
  });

  linkReferencia.value = "";

  buscarBlusas();
}
