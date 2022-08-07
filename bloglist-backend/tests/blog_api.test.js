const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

const initialBlogs = helper.initialBlogs

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('when there is initially some blogs saved', () => {
	test('All blogs are returned as json', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(initialBlogs.length)
	})

	test('A specific blog is returned from the whole set', async () => {
		const response = await api.get('/api/blogs')
		const contents = response.body.map(r => r.title)
		expect(contents).toContainEqual('Story of good')
	})

	test('Unique property is called id', async () => {
		const response = await api.get('/api/blogs')
		response.body.forEach(r => {
			expect(r.id).toBeDefined()
		})
	})
})

describe('Addition of new blogs', () => {
	test('POST a single blog create a new db entry', async () => {
		const newBlog = {
			title: 'A single blog create a new db entry',
			author: 'eipi',
			url: 'http://somewhere.com',
			likes: '1'
		}


		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')

		const titles = response.body.map(r => r.title)

		expect(response.body).toHaveLength(initialBlogs.length + 1)
		expect(titles).toContain('A single blog create a new db entry')
	})

	test('Likes default to 0', async () => {
		const newBlog = {
			title: 'Default Likes shoud be 0',
			author: 'eipi',
			url: 'http://somewhere.com',
		}


		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')

		const newEntry = response.body.find(r => r.title == 'Default Likes shoud be 0')

		expect(newEntry).toBeDefined()
		expect(newEntry.likes).toBe(0)
	})


	test('Missing title field result in 400', async () => {
		let newBlog = {
			// title: 'Default Likes shoud be 0',
			author: 'eipi',
			url: 'http://somewhere.com',
		}


		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})


	test('Missing url field result in 400', async () => {
		let newBlog = {
			title: 'Default Likes shoud be 0',
			author: 'eipi',
			// url: 'http://somewhere.com',
		}


		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})
})

describe('Deletion of notes', () => {
	test('Removing a valid id actual delete from DB', async () => {

        const blogs = await helper.blogsInDb()
		const blog = blogs[0]
		console.log(`Blog to be removed`, blog)
		await api
			.delete(`/api/blogs/${blog.id}`)
			.expect(204)

		const newBlogs = await helper.blogsInDb()
		expect(newBlogs.length).toBe(initialBlogs.length - 1)

		expect(newBlogs.map(b => b.title)).not.toContainEqual(blog.title)
	})
})

describe('Updating a blog', () => {
	test('Updating a valid id actual update from DB', async () => {

        const blogs = await helper.blogsInDb()
		const blog = blogs[0]
		blog.likes += 1
		console.log(`Blog to be updated`, blog)


		await api
			.put(`/api/blogs/${blog.id}`)
			.send(blog)
			.expect(200)

		const newBlogs = await helper.blogsInDb()
		expect(newBlogs.length).toBe(initialBlogs.length)
		const newBlog = newBlogs.find(b => b.title == blog.title)
		expect(newBlog.likes).toBe(blog.likes)
	})
})



afterAll(() => {
  mongoose.connection.close()
})