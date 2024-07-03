const pdfTemplate1 = require('../documents/index1')
const pdfTemplate2 = require('../documents/index2')
const pdf = require('html-pdf');
const fs = require('fs')
const Pfeproject = require('../models/pfeModel')
const Users = require('../models/usersModel')
const Offers = require('../models/offersModel')
const Application = require('../models/applicationModel')

const createPdf = async (req,res) =>{
    const {id} = req.params
    if(id == 'valid'){
        const applicant =[]

        const result = await Application.aggregate([
            {
                $set: {
                offer_id: {
                    $toObjectId: "$offer_id"
                  },
                  
                }
              },
            { $lookup:
               {
                 from: 'offers',
                 localField: 'offer_id',
                 foreignField: '_id',
                 as: 'pendingapp'
               }
    
               
             }
             
        ])
        var count = 0
        for(const obj of result){
            if(obj.accepted ){
                const user = await Users.findById(obj.user_id)
                applicant.push({username:user.username, offer_id:obj.offer_id.toString(), title:obj.pendingapp[0].title})
            }
        }
        const pdfFile  = pdf.create(pdfTemplate1(applicant), {}).toFile(`valid.pdf`, (err) => {
        if(err) {
            res.send(Promise.reject());
            }
        res.send(Promise.resolve());        
        })
     
    }else{
    const offer_id = req.body.offer_id
    const user = await Users.findById(id)
    const pfe = await Pfeproject.find({user_id1:id})
    const offer = await Offers.findById(offer_id)
    const coordinator = await Users.find({field:user.field, coordinator:true})
    console.log(pfe)
    const pdfFile  = pdf.create(pdfTemplate2({student:user.username, field:user.field, start: offer.start, end: offer.end, encadrant: pfe[0].encadrant, coordinator:coordinator[0].username, title:offer.title, company: offer.company}), {}).toFile(`${id}.pdf`, (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
        
    })
   }
}


const getPdf = async  (req,res) =>{
    const {id} = req.params
    const url = __dirname
    const newurl = url.substring(0, url.lastIndexOf('\\'))
    res.sendFile(`${newurl}/${id}.pdf`)
    setTimeout(()=>{
        deletePDF(id,newurl)
    },100)

  
}
const deletePDF = (id, newurl) =>{
    fs.unlink(`${newurl}/${id}.pdf`, (err) => {
        if (err) {
          console.error(err);
        }
    })
}
 

module.exports = {createPdf, getPdf}