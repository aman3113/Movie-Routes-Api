const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  imageURL: String,
  productDescription:String,
  ratings:Number,
  reviews:Number,
  starRating:Number,
  originalPrice:Number,
  DiscountedPrice:Number,
  discountOffer:String,
  discountPercentage:Number,
  packagingFee:Number,
  availableOffers:[string],
  flipkartAssured: Boolean
})