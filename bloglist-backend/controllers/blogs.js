const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    response.status(400).end()
    return
  }

  if (!body.likes) {
    body.likes = 0
  }

  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    author: body.author,
    user: request.user
  })

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  // console.log(`req user: ${request.user.id.toString()}, blog user: ${blog.user.toString()}`)
  if (!request.user || !blog.user || blog.user.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: 'Permission denied' })
  }

  await Blog.findByIdAndDelete(blog.id)
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

  const dbBlog = await Blog.findById(request.params.id)
  console.log(`req user: ${request.user.id.toString()}, blog user: ${dbBlog.user.toString()}`)
  if (!request.user || !dbBlog.user || dbBlog.user.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: 'Permission denied' })
  }

  console.log(`Finding and updating`, blog)
  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(result)
})


module.exports = blogsRouter

