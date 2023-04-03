import { useNotificationValue } from '../NotificationContext';

  const style = {
    padding: 10,
    marginTop: '15px',
    marginBottom: '15px',
  };

const Notification = () => {
  const notification = useNotificationValue();
  if (!notification) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;