const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const itemController = require("../controllers/itemController");

router.get("/all_items", itemController.all_items);

router.get("/get_item/:id", itemController.get_itembyid);

router.post("/add", 
    [
        check("name", "Enter Product Name").not().isEmpty(),
        check("price", "Enter Product Price").not().isEmpty(),
        check("image", "Add Image Link").not().isEmpty(),
        check("description", "Enter product description").not().isEmpty()
    ],
    itemController.add
);

router.put("/edit/:id", 
    [
        check("name", "Enter Product Name").not().isEmpty(),
        check("price", "Enter Product Price").not().isEmpty(),
        check("image", "Add Image Link").not().isEmpty(),
        check("description", "Enter product description").not().isEmpty()
    ],
    itemController.edit
);

router.delete("/delete/:id",
    itemController.delete
);

module.exports = router;