import toast from "react-hot-toast";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export const successToast = (message) => {
  toast.custom(
    (t) => (
      <div className={`app-toast success ${t.visible ? "show" : ""}`}>
        <CheckCircle size={22} />

        <div>
          <div className="app-toast-title">Thành công</div>

          <div className="app-toast-message">{message}</div>
        </div>
      </div>
    ),
    {
      duration: 1,
    },
  );
};

export const errorToast = (message) => {
  toast.custom(
    (t) => (
      <div className={`app-toast error ${t.visible ? "show" : ""}`}>
        <XCircle size={22} />

        <div>
          <div className="app-toast-title">Thất bại</div>

          <div className="app-toast-message">{message}</div>
        </div>
      </div>
    ),
    {
      duration: 1,
    },
  );
};

export const warningToast = (message) => {
  toast.custom(
    (t) => (
      <div className={`app-toast warning ${t.visible ? "show" : ""}`}>
        <AlertTriangle size={22} />

        <div>
          <div className="app-toast-title">Cảnh báo</div>

          <div className="app-toast-message">{message}</div>
        </div>
      </div>
    ),
    {
      duration: 1,
    },
  );
};
