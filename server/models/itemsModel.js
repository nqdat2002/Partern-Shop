const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemsScema = new Schema({
    name:{type:String},
    price:{type:String},
    image:{type:String},
    description:{type:String}
});

const ItemsModel = mongoose.model("items", ItemsScema);

module.exports = ItemsModel;
