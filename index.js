const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.use(express.urlencoded());

let mensagem = "";
let modelo = undefined;
const lista = [
  {
    id: 1,
    nome: "GABRIELLE GAMBINE",
    descricao: `Despontando na moda e na TV, a modelo e atriz transgênero fez sua estreia nas telinhas recentemente, integrando o elenco de Verdades Secretas 2, da Rede Globo.

    Sobrinha de Roberta Close,começou a carreira aos 18 por incentivo de amigos. Desde então, estrelou campanhas para M.A.C, Avon e Havaianas, além de editoriais para Vogue e Glamour.
    
    Gabrielle usa a moda e a atuação na TV como plataformas para inclusão e respeito às pessoas trans e travestis: “Há um longo caminho a percorrer na luta contra o preconceito”, afirma.`,
    imagem1: "img/gabrielleGambine1.jpg",
    imagem2: "img/gabrielleGambine2.jpg",
    instagram: "@gabriellegambinee",
    instagramLink: "https://www.instagram.com/gabriellegambinee/"
  },
  {
    id: 2,
    nome: "ODA THAYLOR",
    descricao: `Natural do arquipélago de Cairu, na Bahia, Oda Thaylor, viu sua vida mudar repentinamente. Revelada pelo The Look Of The Year em 2020, ela logo virou uma aposta da moda. Antes de estrear nas passarelas, chegou a trabalhar como garçonete em sua cidade natal.

    “Sou travesti, preta, já morei numa casa de acolhimento para pessoas LGBTQIA+ em Salvador, chamada Casa Aurora. Identidade de gênero, sexualidade, empoderamento racial e questões sociais me atravessam e marcam a composição de minha história”, diz.`,
    imagem1: "img/odaThaylor1.jpg",
    imagem2: "img/odaThaylor2.jpg",
    instagram: "@oda_cairu",
    instagramLink: "https://www.instagram.com/oda_cairu/"
  },
  {
    id: 3,
    nome: "SAM PORTO",
    descricao: `Foi o primeiro homem trans a desfilar no SPFW, em 2019. Sua performance na passarela repercutiu em veículos de todo o mundo, como o The Washington Post, que deu espaço de destaque ao modelo. Nascido em Brasília, o modelo conquistou o posto de recordista de desfiles na edição SPFW N48. Antes do sucesso na moda, chegou a trabalhar como tatuador e estudar Design Gráfico.

    Já posou para o fotógrafo Mario Testino, estrelou a capa digital da Vogue e participou de editoriais de moda em publicações como Marie Claire e Made in Brazil, apenas para citar algumas.`,
    imagem1: "img/samPorto1.jpg",
    imagem2: "img/samPorto2.jpg",
    instagram: "@samporto",
    instagramLink: "https://www.instagram.com/samporto/"
  }
];

app.get("/", (req, res) => {
    res.render("index", {lista, mensagem});
});

app.get("/details/:id", (req, res) => {
  const id = req.params.id - 1;
  res.render("details", {lista, id});
});

app.get("/update/:id", (req, res) => {
  const id = +req.params.id;
  modelo = lista.filter(Boolean).find((modelo) => modelo.id === id);
  res.render("edit", {lista, id, modelo});
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id;
  delete lista[id];
  res.redirect("/#modelos");
});

app.get("/create", (req, res) => {
  res.render("create", {lista})
});

app.post("/create", (req, res) => {
  modelo = req.body;
  modelo.id = lista.length + 1;
  lista.push(modelo);
  modelo = undefined;
  res.redirect("/#modelos");
});

app.post("/update/:id", (req, res) => {
  const id = +req.params.id;
  const novoModelo = req.body;
  novoModelo.id = id;
  lista[id] = novoModelo;
  modelo = undefined;
  res.redirect("/#modelos");
});


app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
