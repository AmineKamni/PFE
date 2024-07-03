const Application = require('../models/applicationModel')
const Users = require('../models/usersModel')
const Offers = require('../models/offersModel')
const Pfeproject = require('../models/pfeModel')

const fields = ["ASEDS", "AMOA", "DATA", "ICCN", "SESNum", "SmartICT", "SUD-Cloud&IoT"]

const stats = async (req,res) =>{
    const user_application = await Users.aggregate([
        {
            $set: {
            _id: {
                $toString: "$_id"
              },
              
            }
          },
        { $lookup:
           {
             from: 'applications',
             localField: '_id',
             foreignField: 'user_id',
             as: 'app'
           }

           
         }
    ])
    const dash_stats = {students:[0,0,0,0,0,0,0], pending: [0,0,0,0,0,0,0], accepted:[0,0,0,0,0,0,0], validated:[0,0,0,0,0,0,0], teachers:0, enterprises:0, offers:0}
    dash_stats.offers = await Offers.countDocuments()
    dash_stats.teachers = await Users.countDocuments({capacity:"Teacher"})
    dash_stats.enterprises = await Users.countDocuments({capacity:"Enterprise"})
    for(let i =0; i<fields.length; i++){
        dash_stats.students[i] = await Users.countDocuments({field: fields[i], capacity:'Student'})
    }
    for(let n = 0; n< user_application.length ; n++){
        const index = fields.indexOf(user_application[n].field)
        for(let m = 0; m<user_application[n].app.length; m++ ){
            dash_stats.pending[index] += (user_application[n].app[m].pending) ? 1:0
            dash_stats.accepted[index] += (user_application[n].app[m].accepted) ? 1:0
            dash_stats.validated[index] += (user_application[n].app[m].validated) ? 1:0
        }

    }
    
    res.json(dash_stats)
}

module.exports = {stats}