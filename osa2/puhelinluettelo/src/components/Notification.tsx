const Notification = ({
  message,
  notificationType,
}: {
  message: string | null;
  notificationType: "success" | "error";
}) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      className="success"
      style={{
        color: notificationType === "success" ? "green" : "red",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
