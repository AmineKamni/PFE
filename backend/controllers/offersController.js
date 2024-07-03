const Offers = require('../models/offersModel')
const mongoose = require('mongoose')


const getOffers = async(req,res) =>{
    const offers = await Offers.find().sort({createdAt :-1})
    res.status(200).json(offers)
}

const getOffer = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such offer'})
    }

    const offers = await Offers.findById(id)

    if(!offers){
        return res.status(404).json({error: 'No such offer'})
    }
    res.status(200).json(offers)
}



const createOffers = async(req,res)  =>{
    try{
        const offers = await Offers.create({... req.body})
        res.status(200).json(offers)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const deleteOffers = async(req,res) =>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such offer'})
    }
    const offers = await Offers.findOneAndDelete({_id: id})
    if (!offers){
        return res.status(400).json("No such offer")
    }
    res.status(200).json(offers)

}

const updateOffers = async (req,res) =>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such offer'})
    }
    const offers = await Offers.findByIdAndUpdate({_id: id}, {...req.body})
    if (!offers){
        return res.status(400).json("No such offer")
    }
    res.status(200).json(offers)
}









module.exports = {createOffers, getOffer, getOffers, deleteOffers, updateOffers}