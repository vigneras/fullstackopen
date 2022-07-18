const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
   return blogs.reduce( function(sum, blog){
        return sum + blog.likes;
    }, 0);
}


const favoriteBlog = (blogs) => {
   return blogs.reduce((prev, current) => (prev === null ? current :
                                          (prev.likes > current.likes ? prev : current)), null);
}


module.exports = {
  dummy, totalLikes, favoriteBlog
}