const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      className="success"
      style={{
        color: type === "success" ? "green" : "red",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
