const mongoose = require('mongoose')

const artickelSchema = new mongoose.Schema({
    title : {
        type : String
    },
    content : {
        type : String
    },
    author : {
        type : String
    },
    comment : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }]
})

artickelSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Artickel = mongoose.model('Artickel', artickelSchema)
module.exports = Artickel