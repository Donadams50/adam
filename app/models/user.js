const mongoose = require('mongoose')
var Schema = mongoose.Schema
var schema = Schema(
  {
        role:[{ type: Schema.Types.ObjectId, ref: 'role' }],
        firstName: String,
        lastName: String,
        email: String,
        phoneNumber: String,
        isActive: Boolean,
        isVerified:Boolean,
        isDeleted: Boolean,
        addedBy: String
  },
  { timestamps: true }
);

schema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("user_management", schema);
  
  
  
  
  