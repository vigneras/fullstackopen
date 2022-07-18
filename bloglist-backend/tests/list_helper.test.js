const listHelper = require('../utils/list_helper')

const SINGLE_ITEM_LIST = [{
      title: 'Foo',
      author: 'Bar',
      url: 'pi',
      likes: 42,
    }]
const BIG_LIST = [{
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
        title: 'Best',
        author: 'chop',
        url: 'smb://somewheres',
        likes: 3,
      },

    ]


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
    expect(listHelper.totalLikes(SINGLE_ITEM_LIST)).toBe(42)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(BIG_LIST)).toBe(6)
  })
})

describe('favoriteBlog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toBeNull()
  })

  test('of single item, is that one', () => {
    expect(listHelper.favoriteBlog(SINGLE_ITEM_LIST)).toEqual({
      title: 'Foo',
      author: 'Bar',
      url: 'pi',
      likes: 42,
    })
  })

  test('of big list, is best one', () => {
    expect(listHelper.favoriteBlog(BIG_LIST)).toEqual({
        title: 'Best',
        author: 'chop',
        url: 'smb://somewheres',
        likes: 3,
      })
  })
})

