const database = require("./dataBase");
const FoodRepository = require("./repository");

const repository = new FoodRepository(database);

async function getAllProducts(request, reply) {
  const responseDB = await repository.getAllProducts();

  if (responseDB.error) return reply.status(404).json(responseDB.error);

  reply.json(responseDB);
}
async function getProductById(request, reply) {
  const id = request.params.id;
  const responseDB = await repository.getProductById(id);
  if (responseDB.error) return reply.status(404).json(responseDB.error);

  const response = {
    nome,
    preco,
    validade,
  }

  reply.json(response);
}
async function getAllCategory(request, reply) {
  const responseDB = await repository.getAllCategory();

  if (responseDB.error) return reply.status(404).json(responseDB.error);

  reply.json(responseDB);
}
async function setPayment(request, reply){
  const payInfo = request.body;

  const responseDB = await repository.setPayment(payInfo);

  if (responseDB.error) return reply.status(404).json(responseDB.error);

  reply.json(responseDB);
}
async function getHistorico(request, reply){
  const responseDB = await repository.getAllpayments();

  if (responseDB.error) return reply.status(404).json(responseDB.error);

  reply.json(responseDB);
}

module.exports = { getAllProducts, getProductById, setPayment, getHistorico, getAllCategory};