export const compressImage = async (
  file,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.8,
) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Lỗi tạo blob"));
              return;
            }

            const originalSize = (file.size / 1024 / 1024).toFixed(2);
            const compressedSize = (blob.size / 1024 / 1024).toFixed(2);
            const reduction = Math.round((1 - blob.size / file.size) * 100);

            console.log(
              `📦 Nén ảnh: ${originalSize}MB → ${compressedSize}MB (giảm ${reduction}%)`,
            );

            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
            });

            resolve(compressedFile);
          },
          "image/jpeg",
          quality,
        );
      };

      img.onerror = () => {
        reject(new Error("Lỗi tải ảnh"));
      };
    };

    reader.onerror = () => {
      reject(new Error("Lỗi đọc file"));
    };
  });
};
