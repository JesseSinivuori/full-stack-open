import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import Info from "./components/Info";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const storedUser = window.localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ?? null);
  console.log(user);
  const getBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const [info, setInfo] = useState(null);
  const [infoType, setInfoType] = useState();

  const showInfo = (message, type) => {
    type === "success" ? setInfoType("success") : setInfoType("error");
    setInfo(message);
    setTimeout(() => setInfo(null), 4000);
  };

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (!user) {
    return (
      <>
        <Info message={info} type={infoType} />
        <h2>log in to application</h2>
        <Login setUser={setUser} showInfo={showInfo} />
      </>
    );
  }
  console.log(user);
  return (
    <div>
      <Info message={info} type={infoType} />
      <button type="submit" onClick={handleLogOut}>
        log out
      </button>
      <h2>blogs</h2>
      <p>{`${user.name} logged in`}</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
