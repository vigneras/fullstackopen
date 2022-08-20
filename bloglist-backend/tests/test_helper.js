const Blog = require('../models/blog')


const initialBlogs = [{
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

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url:'http://doncare.com/'})
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}