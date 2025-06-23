class FoodRepository {
  constructor(database) {
    this.database = database;
  }

  async getAllProducts() {
    try {
      const sql = "select * from produto";
      const responseDB = await this.database.query(sql);

      return responseDB.rows;
    } catch (error) {
      return { error: error.message };
    }
  }
  
  async getAllCategory() {
    try {
      const sql = "select * from categoria";
      const responseDB = await this.database.query(sql);

      return responseDB.rows;
    } catch (error) {
      return { error: error.message };
    }
  }

  async getProductById(id) {
    try{
      const sql = "select name, preco, validade from produto where id = $1";
      const responseDB = await this.database.query(sql, [id]);
      return responseDB.rows;

    }catch(error){
      return{error: error.message};
    }
  }

  async setPayment(payInfo) {
    try{
      const sql = `insert into venda (total)
                   values ($1)`;
      const response = await this.database.query(sql, [payInfo.total]);

      return "Pagamento realizado!";
    }catch(erro){
      return{error: error.message}
    }
  }

  async getAllpayments() {
    try {
      const sql = "select * from venda";
      const responseDB = await this.database.query(sql);

      return responseDB.rows;
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = FoodRepository;