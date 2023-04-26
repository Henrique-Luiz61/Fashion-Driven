const nomeUsuario = prompt("Qual é o seu nome ?");
if (nomeUsuario !== "" || nomeUsuario !== undefined) {
  buscarBlusas();
}

let tipoCamisa,
  tipoGola,
  tipoTecido,
  linkReferencia,
  textoLink,
  criadorSelecionado;

let ultimosPedidos = [];

axios.defaults.headers.common["Authorization"] = "p3VJLB6nvGVsY41r5CrhIb9S";

function renderizarBlusasPedidas() {
  const divPedidos = document.querySelector(".ultimos-pedidos");
  divPedidos.innerHTML = "";

  console.log(ultimosPedidos);

  for (let i = 0; i < ultimosPedidos.length; i++) {
    divPedidos.innerHTML += `
    <div onclick="encomendarBlusaJaCriada(this)" class="produto-footer">
        <img src="${ultimosPedidos[i].image}">
        <div class="descricao-footer">  
          <strong>Criador:</strong> 
          <p>${ultimosPedidos[i].owner}</p>
        </div>
     </div>`;

    console.log(ultimosPedidos[i].image);
    console.log(ultimosPedidos[i].owner);
  }
}

function buscarBlusas() {
  const promise = axios.get(
    "https://mock-api.driven.com.br/api/v4/shirts-api/shirts"
  );
  promise.then((res) => {
    console.log(res);
    alert("tudo ok");

    ultimosPedidos = res.data;

    renderizarBlusasPedidas();
  });
  promise.catch((erro) => {
    console.log(erro);
    console.log("algo deu errado");
  });
}

function liberarBotaoPedido() {
  console.log(tipoCamisa);
  console.log(tipoGola);
  console.log(tipoTecido);
  console.log(textoLink);
  console.log(nomeUsuario);
  console.log(linkReferencia);
  console.log(linkReferencia.value);
  if (
    tipoCamisa !== undefined &&
    tipoGola !== undefined &&
    tipoTecido !== undefined &&
    textoLink !== "" &&
    textoLink !== undefined &&
    linkReferencia.value !== ""
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
  console.log(itemJaSelecionado);

  if (itemJaSelecionado !== null) {
    itemJaSelecionado.classList.remove("selecionado");
  }

  const imagemCamisa = camisa.querySelector(".imagem-item");
  imagemCamisa.classList.add("selecionado");

  tipoCamisa = camisa.querySelector("p").innerHTML;
  console.log(tipoCamisa);

  liberarBotaoPedido();
}

function selecionaGola(gola) {
  let itemJaSelecionado = document.querySelector(".golas .selecionado");

  if (itemJaSelecionado !== null) {
    itemJaSelecionado.classList.remove("selecionado");
  }

  const imagemGola = gola.querySelector(".imagem-item");
  imagemGola.classList.add("selecionado");

  tipoGola = gola.querySelector("p").innerHTML;

  liberarBotaoPedido();
}

function selecionaTecido(tecido) {
  let itemJaSelecionado = document.querySelector(".tecidos .selecionado");

  if (itemJaSelecionado !== null) {
    itemJaSelecionado.classList.remove("selecionado");
  }

  const imagemTecido = tecido.querySelector(".imagem-item");
  imagemTecido.classList.add("selecionado");

  tipoTecido = tecido.querySelector("p").innerHTML;

  liberarBotaoPedido();
}

function pegarLink() {
  linkReferencia = document.querySelector("input");

  textoLink = document.querySelector("input").value;
  liberarBotaoPedido();
}

function desabilitarBotao() {
  const botaoConfirmar = document.querySelector("button");
  botaoConfirmar.classList.remove("botao-ativo");
  botaoConfirmar.setAttribute("disabled", "disabled");
}

function confirmarEncomenda() {
  let objEncomenda = {};
  if (criadorSelecionado === undefined) {
    objEncomenda = {
      model: tipoCamisa,
      neck: tipoGola,
      material: tipoTecido,
      image: textoLink,
      owner: nomeUsuario,
      author: nomeUsuario,
    };
  } else {
    objEncomenda = {
      model: tipoCamisa,
      neck: tipoGola,
      material: tipoTecido,
      image: textoLink,
      owner: criadorSelecionado,
      author: nomeUsuario,
    };
  }

  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v4/shirts-api/shirts",
    objEncomenda
  );

  promise.then((res) => {
    console.log(res);
    alert("Sua encomenda foi enviada com Sucesso!");

    buscarBlusas();
  });
  promise.catch((erro) => {
    console.log(erro);
    alert("Ops, não conseguimos processar sua encomenda!");
  });

  linkReferencia.value = "";

  desabilitarBotao();
}

function encomendarBlusaJaCriada(blusaSelecionada) {
  let resposta = confirm("Gostaria de encomendar essa blusa ?");

  if (resposta) {
    let imagemSelecionada = blusaSelecionada.querySelector("img").src;

    criadorSelecionado = blusaSelecionada.querySelector("p").innerHTML;

    for (let i = 0; i < ultimosPedidos.length; i++) {
      if (
        imagemSelecionada === ultimosPedidos[i].image &&
        criadorSelecionado === ultimosPedidos[i].owner
      ) {
        tipoCamisa = ultimosPedidos[i].model;
        tipoGola = ultimosPedidos[i].neck;
        tipoTecido = ultimosPedidos[i].material;
        textoLink = ultimosPedidos[i].image;
        linkReferencia = ultimosPedidos[i].image;
      }
    }
    confirmarEncomenda();

    criadorSelecionado = undefined;
    textoLink = "";
  }
}
