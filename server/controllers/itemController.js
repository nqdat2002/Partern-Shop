const ItemModel = require("../models/itemsModel");
const { check, validationResult } = require("express-validator");

exports.all_items = async(req, res, next) => {
    const product = await ItemModel.find({});
    res.json(product);
};

exports.get_itembyid = async(req, res, next) =>{
    const { id } = req.params;
    const product = await ItemModel.findById(id);
    if (!product) {
        res.json({ message: "Product not found", status: 0 });
        return;
    } 
    res.json(product);
};

exports.add = async(req, res, next) =>{
    const { name, price, image, description } = req.body;

    const error = validationResult(req);

    if (!error.isEmpty()) {
        res.json({ error: error.array(), status: 0 });
        return;
    }

    const newProduct = new ItemModel({
        name,
        price,
        image,
        description,
    });

    newProduct.save().then((docs) => {
        res.send({ message: "Product added", status: 1, docs });
    });
};

exports.edit = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updateItem = await ItemModel.findOneAndUpdate(
            id, 
            updateData, { new: true,
        });
        res.json({updateItem});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.delete = async (req, res, next) => {
    const {id }= req.params;
    await ItemModel.findByIdAndDelete(id).then(item =>{
        if(!item){
            res.status(404).send("Can not delete!!! May be wrong id");
        }
        else{
            res.send({
                message:"Item was deleted successfully!"
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: "Could not delte item with id: " + id
        });
    });
};