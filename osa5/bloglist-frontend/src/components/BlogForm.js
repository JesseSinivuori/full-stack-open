import { useState } from "react";
import { create } from "../services/blogs";

export default function BlogForm({ setBlogs, notification }) {
  const [newBlog, setNewBlog] = useState({
    title: "Title",
    author: "Author",
    url: "url",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newBlog.title && !newBlog.url)
      return notification("Title and url is required.", "error");
    if (!newBlog.title) return notification("Title is required.", "error");
    if (!newBlog.url) return notification("Url is required.", "error");

    try {
      const createdBlog = await create(newBlog);
      console.log(createdBlog);
      setBlogs((prevBlogs) => prevBlogs.concat(createdBlog));
      setNewBlog({ title: "", author: "", url: "" });
      notification(`Blog "${newBlog.title}" created. `, "success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        title
        <input
          type="text"
          value={newBlog.title}
          name="Title"
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={newBlog.author}
          name="Author"
          onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={newBlog.url}
          name="Url"
          onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
}
