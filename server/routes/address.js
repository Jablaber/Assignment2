const express = require('express');
const router = express.Router();
const { User, Address } = require('../models');
const { Op } = require("sequelize");
const yup = require("yup");
//const { validateToken } = require('../middlewares/auth');

router.post("/", async (req, res) => {
    let newData = req.body;
    // console.log('Request Body:', data);
    //data.userId = req.user.id;

    let result = await Address.create(newData);
    res.json(result);

    // Validate request body
    let validationSchema = yup.object({
        block_no: yup.string().min(1).max(10).required(),
        street_name: yup.string().min(3).max(500).required(),
        postal_code: yup.number().min(1).max(1000000).required(),
        is_default: yup.boolean().required(),
        userId: yup.number().required()
    });
    // try {
    //     // console.log(data);
    //     addData = await validationSchema.validate(data,
    //         { abortEarly: true });
    //     console.log(data);

    //     console.log(addData);
    //     let result = await Address.create(addData);
    //     res.json(result);

    // }
    // catch (err) {
    //     res.status(400).json({ errors: err.errors });
    //     console.log(err);
    // }
});



// router.get("/", async (req, res) => {

//     let condition = {};
//     let search = req.query.search;

//     if (search) {
//         condition[Op.or] = [
//             { userId: { [Op.like]: `%${search}%` } },

//         ];
//         let addressList = [await Address.findAll({
//             where: condition,
//             order: [['createdAt', 'DESC']],
//             include: { model: User, as: "user", attributes: ['name'] }
//             // include: { model: Address, as: "address", attributes: ['block_no', 'street_name', 'postal_code', 'is_default', 'userId'] }
//         })];
//         //   console.log("address list", addressList, typeof addressList);
//         res.json(addressList);
//     }

// });

router.get("/", async (req, res) => {
    try {
        let condition = {};
        let search = req.query.search;

        if (search) {
            condition[Op.or] = [
                { userId: { [Op.like]: `%${search}%` } }
            ];
        }

        // Fetch addresses based on the condition
        let addressList = await Address.findAll({
            where: condition,
            order: [['createdAt', 'DESC']]
        });

        // Ensure the response is always an array
        console.log(addressList);
        res.json({ items: addressList });
        
    } catch (error) {
        console.error("Error fetching addresses:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
