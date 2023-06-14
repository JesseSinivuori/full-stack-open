import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import { getAll, remove, setToken } from "./services/blogs";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ?? null);

  const getBlogs = async () => {
    try {
      const blogs = await getAll();
      setBlogs(blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    if (user) {
      setToken(user.token);
    }
  }, [user]);

  const [notificationText, setNotificationText] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  const notification = (message, type) => {
    type === "success"
      ? setNotificationType("success")
      : setNotificationType("error");
    setNotificationText(message);

    setTimeout(() => setNotificationText(null), 4000);
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowCreateBlog(false);
  };

  const handleDelete = async (blog) => {
    if (user.id !== blog.user.id) {
      return notification(
        "You don't have permission to delete this blog.",
        "error"
      );
    }

    try {
      const id = blog.id;
      await remove(blog.id);

      setBlogs(blogs.filter((blog) => blog.id !== id));
      notification(`Blog "${blog.title}" deleted.`, "success");
    } catch (error) {
      notification("Unauthorized.", "error");
    }
  };

  const [showCreateBlog, setShowCreateBlog] = useState(false);

  if (!user) {
    return (
      <>
        <Notification message={notificationText} type={notificationType} />
        <h2>log in to application</h2>
        <Login setUser={setUser} notification={notification} />
      </>
    );
  }

  return (
    <div>
      <Notification message={notificationText} type={notificationType} />
      <button type="submit" onClick={handleLogOut}>
        log out
      </button>
      <BlogForm
        blogs={blogs}
        setBlogs={setBlogs}
        notification={notification}
        setShowCreateBlog={setShowCreateBlog}
        showCreateBlog={showCreateBlog}
        user={user}
      />
      <h2>blogs</h2>
      <p>{`${user.name} logged in`}</p>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleDelete={() => handleDelete(blog)}
        />
      ))}
    </div>
  );
};

export default App;
