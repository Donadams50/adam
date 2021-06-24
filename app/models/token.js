const mongoose = require('mongoose')
var Schema = mongoose.Schema
var schema = Schema(
  {
    code:String,
    userId:String
  },
  { timestamps: true }
);

schema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("token", schema);
  
  
  
  
  