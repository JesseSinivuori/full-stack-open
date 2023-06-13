const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return (
    <p
      className="success"
      style={{
        color: type === "success" ? "green" : "red",
        border: "solid 1px",
        borderColor: type === "success" ? "green" : "red",
        padding: 12,
      }}
    >
      {message}
    </p>
  );
};

export default Notification;
