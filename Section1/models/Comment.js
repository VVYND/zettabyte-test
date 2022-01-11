const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content : String,
    artickel : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Artickel'
    }
})

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment