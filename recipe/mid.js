const express = require('express')  

const check = (req , res , next) =>{
    let {name , description , preparationTime , cookingTime , imageUrl, country ,veg}= req.body
    if(name && description && preparationTime && cookingTime && imageUrl && country && veg){
        next ()
    } 
    else{
        res.status(400).send("all fields are required.")
    }
}
module.exports = check