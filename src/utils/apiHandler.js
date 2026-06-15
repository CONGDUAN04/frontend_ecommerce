import {
  successToast,
  errorToast,
  warningToast,
} from "../components/ui/toast.jsx";

export const handleApiSuccess = (message) => {
  successToast(message || "Thao tác thành công");
};

export const handleApiError = (err, form) => {
  const error = err?.error || err;

  // form error
  if (form && Array.isArray(error?.errors) && error.errors.length > 0) {
    const fields = error.errors
      .filter((e) => e.field)
      .map((e) => ({
        name: String(e.field),
        errors: [e.message],
      }));

    if (fields.length > 0) {
      form.setFields(fields);
      return;
    }
  }

  // conflict
  if (error?.code === "CONFLICT" || error?.ErrorCode === 2) {
    warningToast(error.message);
    return;
  }

  errorToast(error?.message || "Có lỗi xảy ra, vui lòng thử lại");
};
