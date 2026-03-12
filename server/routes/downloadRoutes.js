const express = require("express");

const DigitalOrder = require("../models/DigitalOrder");

const router = express.Router();


router.get("/:token", async(req,res)=>{

try{

const order = await DigitalOrder.findOne({

downloadToken:req.params.token,
paymentStatus:"paid"

});

if(!order){

return res.status(404).send("Invalid download link");

}

res.redirect(order.downloadUrl);

}catch(err){

res.status(500).send("Download error");

}

});

module.exports = router;