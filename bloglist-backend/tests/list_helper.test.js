const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  /* global expect*/
  expect(result).toBe(1)
})


describe('totalLikes', () => {
  test('of empty list is 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when one item, is the likes of it', () => {
    expect(listHelper.totalLikes([{
      title: 'Foo',
      author: 'Bar',
      url: 'pi',
      likes: 42,
    }])).toBe(42)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes([{
      title: 'Foo',
      author: 'Bar',
      url: 'pi',
      likes: 0,
    },
    {
      title: 'Foo',
      author: 'Bar',
      url: 'pi',
      likes: 1,
    },
    {
      title: 'Foo',
      author: 'Bar',
      url: 'pi',
      likes: 2,
    },
    {
      title: 'Foo',
      author: 'Bar',
      url: 'pi',
      likes: 3,
    },

    ])).toBe(6)
  })


})
