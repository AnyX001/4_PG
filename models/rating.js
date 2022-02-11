const mongoose =require("mongoose");
const Schema = mongoose.Schema;

var ratingSchema = new Schema({
    pgId: { "type": Schema.Types.ObjectId, "ref": "PgSchema" },
    userId: { "type": Schema.Types.ObjectId, "ref": "UserSchema" },
    rating: { "type": Number, "required": true },
    review:{"type":String,"required":true}
  });
  const RatingSchema= mongoose.model('RatingSchema',ratingSchema);
module.exports=RatingSchema;