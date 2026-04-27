/* eslint-disable react-hooks/refs */
import { notification } from "antd";
import { NotifyContext } from "./notify.context.jsx";
import { useMemo, useRef } from "react";

const NotifyProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const apiRef = useRef(api);
  apiRef.current = api;

  const value = useMemo(
    () => ({
      api: apiRef.current,
      contextHolder,
    }),
    [],
  );

  return (
    <NotifyContext.Provider value={value}>
      {contextHolder}
      {children}
    </NotifyContext.Provider>
  );
};

export default NotifyProvider;
