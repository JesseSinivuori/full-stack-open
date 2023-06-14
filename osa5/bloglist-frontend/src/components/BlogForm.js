import { useState } from "react";
import { create } from "../services/blogs";
import FormInput from "./FormInput";

export default function BlogForm({
  setBlogs,
  notification,
  setShowCreateBlog,
  showCreateBlog,
  user,
}) {
  const [newBlog, setNewBlog] = useState({
    title: "Title",
    author: "Author",
    url: "Url",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newBlog.title && !newBlog.url)
      return notification("Title and url is required.", "error");
    if (!newBlog.title) return notification("Title is required.", "error");
    if (!newBlog.url) return notification("Url is required.", "error");

    try {
      const createdBlog = await create(newBlog);
      const createdBlogWithUser = {
        ...createdBlog,
        user: { name: user.name, id: user.id },
      };
      console.log(createdBlogWithUser);
      setBlogs((prevBlogs) => prevBlogs.concat(createdBlogWithUser));
      setNewBlog({ title: "", author: "", url: "" });
      notification(`Blog "${newBlog.title}" created. `, "success");
      setShowCreateBlog(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (!showCreateBlog)
    return (
      <button type="button" onClick={() => setShowCreateBlog(true)}>
        create
      </button>
    );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>create new</h2>
        {Object.keys(newBlog).map((prop) => (
          <FormInput
            key={prop}
            text={prop}
            value={newBlog[prop]}
            onChange={(e) => setNewBlog({ ...newBlog, [prop]: e.target.value })}
          />
        ))}
        <button type="submit">create</button>
      </form>
      <button type="button" onClick={() => setShowCreateBlog(false)}>
        cancel
      </button>
    </div>
  );
}
