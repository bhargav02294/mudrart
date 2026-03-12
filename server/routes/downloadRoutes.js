const express = require("express");
const axios = require("axios");

const DigitalOrder = require("../models/DigitalOrder");

const router = express.Router();


/* =================================
DOWNLOAD DIGITAL POSTER
================================= */

router.get("/:token", async (req,res)=>{

try{

const order = await DigitalOrder.findOne({

downloadToken:req.params.token,
paymentStatus:"paid"

});

if(!order){

return res.status(404).send("Invalid download link");

}


/* ===============================
GET FILE FROM CLOUDINARY
=============================== */

const fileResponse = await axios({

url:order.downloadUrl,
method:"GET",
responseType:"stream"

});


/* ===============================
SET DOWNLOAD HEADERS
=============================== */

res.setHeader(

"Content-Disposition",
`attachment; filename="${order.posterName}.png"`

);

res.setHeader(

"Content-Type",
fileResponse.headers["content-type"]

);


/* ===============================
STREAM FILE TO USER
=============================== */

fileResponse.data.pipe(res);


}catch(err){

console.error("DOWNLOAD ERROR:",err);

res.status(500).send("Download failed");

}

});


module.exports = router;