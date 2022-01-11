const artickelRouter = require('express').Router()

const Artickel = require('../models/Artickel')
const Comment = require('../models/Comment')


artickelRouter.get('/', async (request, response) => {
    const artikels = await Artickel.find({})
    response.json(artikels.map(artikel => artikel.toJSON()))
})

artickelRouter.get('/:id', async (request,response,next) => {
    try {
        const artickel = await Artickel.findById(request.params.id)
        response.json(artickel.toJSON())  
    } catch (exeption) {
        next(exeption)
    }
    
})

artickelRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (!body.comments) {
        body.comments = []
    }

    const artickel = new Artickel({
        title : body.title,
        content : body.content,
        author : body. author
    })

    try {
        const savedArtickel = await artickel.save()
        response.json(savedArtickel.toJSON())
    } catch(exeption) {
        next(exeption)
    }
})

artickelRouter.delete('/:id', async (request, response, next) => {
    await Artickel.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

artickelRouter.put('/:id', async (request,response, next) => {
    const body = request.body

    const artickel =  {
        title : body.title,
        content : body.content,
        author : body. author
    }

    try {
        const updatedArtickel = await Artickel.findByIdAndUpdate(request.params.id, artickel, {new : true})
        response.json(updatedArtickel.toJSON())
    } catch(exeption) {
        next(exeption)
    }
})

artickelRouter.post('/:id/comment', async(request,response,next) => {
    const body = request.body
    const artickel = await Artickel.findOne({_id : request.params.id})

    const comment = new Comment({
        content : body.content,
        artickel : artickel._id
    })
    const savedComment = await comment.save()
    console.log(artickel.comment)
    artickel.comment.push(comment._id)
    await artickel.save()
    response.json(savedComment.toJSON())

})

artickelRouter.get('/:id/comment', async (request,response) => {
    const artickel = await Artickel.findOne({ _id : request.params.id }).populate("comment")
    response.json(artickel.toJSON())
})

artickelRouter.put('/comment/:id', async (request,response,next) => {
    const body = request.body

    const comment = {
        content : body.content
    }

    const commentToUpdate = await Comment.findByIdAndUpdate({_id : request.params.id}, comment, { new: true })
    response.json(commentToUpdate.toJSON())
})

artickelRouter.delete('/comment/:id', async (request, response, next) => {
    await Comment.findByIdAndRemove(request.params.id)
    response.status(204).end()
})


module.exports = artickelRouter