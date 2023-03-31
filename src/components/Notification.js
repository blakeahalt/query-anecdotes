import React, { useEffect } from 'react';

const Notification = (props) => {
  const style = {
    padding: 10,
    marginTop: '15px',
    marginBottom: '15px',
  };

  useEffect(() => {
    if (props.message !== '') {
      const timer = setTimeout(() => {
        props.setMessage('');
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [props.message]);

  return props.message ? (
    <div style={style}>{props.message}</div>
  ) : null;
};

export default Notification;
