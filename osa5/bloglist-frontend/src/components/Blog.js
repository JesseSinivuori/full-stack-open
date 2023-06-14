import { useState } from "react";
const Blog = ({ blog, handleDelete, handleLike }) => {
  const [showblog, setShowBlog] = useState(false);

  const ShowButton = () => {
    if (!showblog) {
      return (
        <button type="button" onClick={() => setShowBlog(true)}>
          view
        </button>
      );
    } else {
      return (
        <button type="button" onClick={() => setShowBlog(false)}>
          hide
        </button>
      );
    }
  };

  const DeleteButton = () => (
    <button type="button" onClick={handleDelete}>
      delete
    </button>
  );

  const LikeButton = () => (
    <button type="button" onClick={handleLike}>
      like
    </button>
  );

  return (
    <div
      style={{
        border: "solid 1px",
        margin: 6,
        padding: 12,
        display: "flex",
      }}
    >
      <div>
        <div>
          <div>
            {blog.title} {blog.author}
          </div>
          <ShowButton />
          <DeleteButton />
        </div>
        {showblog && (
          <div>
            <div>{blog.url}</div>
            <div>
              {blog.likes}
              <LikeButton />
            </div>
            <div>{blog.user.name}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
