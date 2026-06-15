export const handleApiSuccess = (api, message) => {
  api.success({
    description: message || "Thao tác thành công",
    duration: 1,
    placement: "top",
  });
};

export const handleApiError = (api, err, form) => {
  const error = err?.error || err;

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

  if (error?.code === "CONFLICT" || error?.ErrorCode === 2) {
    api.warning({
      description: error.message,
      duration: 1,
      placement: "top",
    });
    return;
  }

  api.error({
    description: error?.message || "Có lỗi xảy ra, vui lòng thử lại",
    duration: 1,
    placement: "top",
  });
};
