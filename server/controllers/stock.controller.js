import stock from "../models/stock.model.js";


export const addStock = async (req, res) => {
    console.log(req.body)
    const newStock = new stock({
        name: req.body.name,
        quantity:parseInt(req.body.quantity)
    });

    try {
        const savedStock = await newStock.save();
        res.status(200).send({ success: true, savedStock });

    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
}

export const getStock = async (req, res) => {
    try {
        const Stock = await stock.find();
        res.status(200).send({ success: true, Stock });
    } catch (err) { 
        console.log(err.message)
        res.status(500).send({ success: false, message: err.message });
    }
}

