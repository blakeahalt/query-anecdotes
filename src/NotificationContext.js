import React from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'RESET':
      return '';
    default:
      return state;
  }
};

const context = React.createContext();

const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = React.useReducer(notificationReducer, '');

  return (
    <context.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </context.Provider>
  );
};

const useNotificationValue = () => {
  const [notification] = React.useContext(context);
  return notification;
};

const useNotificationDispatch = () => {
  const [, dispatch] = React.useContext(context);
  return dispatch;
};

export { NotificationContextProvider, useNotificationValue, useNotificationDispatch };