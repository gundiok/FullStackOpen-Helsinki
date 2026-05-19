const Notification = ({ message, error }) => {
  if (!message && !error) {
    return null;
  }
  return (
    <div className={error ? "error" : "notification"}>{error || message}</div>
  );
};

export default Notification;
