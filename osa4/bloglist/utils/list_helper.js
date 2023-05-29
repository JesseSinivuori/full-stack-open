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

const mostBlogs = (blogs) => {
  const counts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1;
    return counts;
  }, {});
  const [author, blogCount] = Object.entries(counts).reduce(
    (prevAuthor, author) => {
      author[1] > prevAuthor[1] ? author : prevAuthor;
      return author;
    }
  );

  return {
    author: author,
    blogs: blogCount,
  };
};

const mostLikes = (blogs) => {
  const counts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + blog.likes;
    return counts;
  }, {});
  const [author, likes] = Object.entries(counts).reduce((prevAuthor, author) =>
    author[1] > prevAuthor[1] ? author : prevAuthor
  );

  return {
    author: author,
    likes: likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
