const dummy = (blogs) => {
  if (blogs) {
    return 1;
  }
};

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => (sum += blog.likes), 0);
  return total;
};

const favoriteBlog = (blogs) => {
  const mostLiked = blogs.reduce((prevBlog, blog) =>
    blog.likes > prevBlog.likes ? blog : prevBlog
  );
  return mostLiked;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
