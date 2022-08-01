const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: 'Best in class',
		author: 'Myself',
		url: 'http://somewhere.com/',
		likes: 3
	},
	{
		title: 'Story of good',
		author: 'Moliere',
		url: 'http://moliere.com/',
		likes: 1
	}
	]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('All blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('A specific blog is returned from the whole set', async () => {
	const response = await api.get('/api/blogs')
	const contents = response.body.map(r => r.title)
	expect(contents).toContainEqual('Story of good')
}
)

afterAll(() => {
  mongoose.connection.close()
})