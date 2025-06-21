const express = require("express");
const Controller = require("./controller");
const cors = require("cors");

const server = express();
const PORT = 8080;

server.use(cors());
server.use(express.json())

server.get("/produtos", Controller.getAllProducts);
server.get("/categorias", Controller.getAllCategory)
server.get("/produtos/:id", Controller.getProductById);
server.post("/pagamento", Controller.setPayment);
server.get("/historico", Controller.getHistorico);

server.listen(PORT, () => console.log("Server ON"));