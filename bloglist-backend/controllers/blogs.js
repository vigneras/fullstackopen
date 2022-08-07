const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    response.status(400).end()
    return
  }

  if (!blog.likes) {
    blog.likes = 0
  }

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  console.log(request.params)
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    ...request.body
  }
  delete blog._id

  if (!blog.title || !blog.url) {
    response.status(400).end()
    return
  }

  if (!blog.likes) {
    blog.likes = 0
  }

console.log(`Finding and updating`, blog)
  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(result)
})


module.exports = blogsRouter

