/* eslint-disable no-useless-catch */
import { useState, useRef } from "react";
import { validateImageFile } from "../utils/fileValidator";
import { uploadToCloudinary } from "../utils/uploadCloudinary";
import { deleteFileAPI } from "../services/api.upload";
import { compressImage } from "../utils/imageCompress";

export const useImageUpload = (form, config) => {
  const { type, fieldName, fieldId } = config;

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadTime, setUploadTime] = useState(0);

  const objectUrlRef = useRef(null);
  const inputRef = useRef(null);
  const uploadPromiseRef = useRef(null);
  const uploadStartTimeRef = useRef(null);

  const setPreviewFromUrl = (url) => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setPreview(url);
    setError(null);
    setUploadTime(0);
    setUploadProgress(0);
  };

  const handleChangeFile = async (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    const check = validateImageFile(file);
    if (!check.valid) {
      setError(check.message);
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);
    setUploadTime(0);

    try {
      let fileToUpload = file;
      try {
        fileToUpload = await compressImage(file, 1200, 1200, 0.8);
      } catch (compressErr) {
        console.warn("Compress failed, upload original:", compressErr);
      }

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }

      const objectUrl = URL.createObjectURL(fileToUpload);
      objectUrlRef.current = objectUrl;
      setPreview(objectUrl);

      uploadStartTimeRef.current = Date.now();

      uploadPromiseRef.current = (async () => {
        try {
          const oldPublicId = form.getFieldValue(fieldId);

          const { imageUrl, publicId } = await uploadToCloudinary(
            fileToUpload,
            type,
            (percent) => {
              setUploadProgress(percent);
            },
          );

          const elapsed = Date.now() - uploadStartTimeRef.current;
          setUploadTime(elapsed);

          form.setFieldsValue({
            [fieldName]: imageUrl,
            [fieldId]: publicId,
          });

          setPreview(imageUrl);
          setUploadProgress(100);
          setIsUploading(false);

          if (oldPublicId) {
            deleteFileAPI(oldPublicId).catch((err) => {
              console.log("Delete old image failed:", err);
            });
          }
        } catch (err) {
          throw err;
        }
      })();
    } catch (err) {
      setError("Upload thất bại");
      setPreview(null);
      setIsUploading(false);
      setUploadProgress(0);
      form.setFieldsValue({
        [fieldName]: null,
        [fieldId]: null,
      });
    }
  };

  const logoValidator = async (_, value) => {
    if (isUploading) {
      return Promise.resolve();
    }
    if (preview && preview.startsWith("blob:")) {
      if (!uploadPromiseRef.current) {
        return Promise.reject("Vui lòng chọn ảnh");
      }

      try {
        await uploadPromiseRef.current;
        return Promise.resolve();
      } catch {
        return Promise.reject("Upload thất bại");
      }
    }

    if (typeof value === "string" && value.startsWith("http")) {
      return Promise.resolve();
    }

    if (preview) {
      return Promise.resolve();
    }

    return Promise.reject("Vui lòng chọn ảnh");
  };

  const resetImage = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setPreview(null);
    setError(null);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadTime(0);
    uploadPromiseRef.current = null;

    form.setFieldsValue({ [fieldName]: null, [fieldId]: null });
    form.setFields([{ name: fieldName, errors: [] }]);
  };

  return {
    preview,
    error,
    isUploading,
    uploadProgress,
    uploadTime,
    handleChangeFile,
    logoValidator,
    resetImage,
    setPreviewFromUrl,
    inputRef,
  };
};
