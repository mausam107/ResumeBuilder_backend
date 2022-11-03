const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resumeSchema = new Schema({
  user_details: {
    name:{type: String, required: true},
    email: { type: String, required: true },
    phone: { type: String, required: true},
    
  },  
  education: {
    pg: { 
      percentage:{ type: String},
      yearOfPassing:{ type: String},
      institute:{type:String}
     },
    ug: { 
      percentage:{ type: String},
      yearOfPassing:{ type: String},
      institute:{type:String}
     },
    twelth: { 
      percentage:{ type: String},
      yearOfPassing:{ type: String},
      institute:{type:String}
     } ,
    tenth: { 
      percentage:{ type: String},
      yearOfPassing:{ type: String},
      institute:{type:String}
     }  
    
  },
  experience:{type:String},
  project:{ type:String},
  portfolio:{type:String}
});

module.exports = mongoose.model('resume',resumeSchema);