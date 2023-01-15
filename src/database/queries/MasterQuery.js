export default class MasterQuery {
   constructor(Model) {
      this.Model = Model;
   }

   async create(input) {
      return await this.Model.create(input);
   }

   async createMultiple(input) {
      return await this.Model.bulkCreate(input);
   }

   async update(rowUpdate, conditions = {}) {
      let model;
      try {
         model = await this.Model.update(rowUpdate, { where: conditions });
      } catch (err) {
         console.log(err);
      }
      return model;
   }

   async findAll(options) {
      return await this.Model.findAll(options);
   }

   async findById(id) {
      return this.Model.findById(id);
   }

   async findOne(inputWhere) {
      return this.Model.findOne(inputWhere);
   }

   async delete(inputWhere) {
      return this.Model.destroy(inputWhere);
   }
}
