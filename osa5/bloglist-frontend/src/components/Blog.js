const Blog = ({ blog, handleDelete }) => {
  return (
    <div>
      {blog.title} {blog.author}
      <button type="button" onClick={handleDelete}>
        delete
      </button>
    </div>
  );
};

export default Blog;
