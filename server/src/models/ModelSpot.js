const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ModelSpot = new Schema({
    desc: {
      type: String
    },
  
  },{
      collection: 'Tasks'
  });
  
  module.exports = mongoose.model('ModelSpot', ModelSpot);