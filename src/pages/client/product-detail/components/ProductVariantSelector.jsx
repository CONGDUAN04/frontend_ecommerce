import { Check } from "lucide-react";

export default function ProductVariantSelector({
  colors,
  storages,
  selectedColor,
  selectedStorage,
  setSelectedColor,
  setSelectedStorage,
  setSelectedImage,
  product,
}) {
  return (
    <>
      <div className="variant-interactive-group">
        <label className="group-label">Màu sắc:</label>

        <div className="color-chips-flex">
          {colors.map((color) => {
            const isOutOfStock = !product.variants.some(
              (v) => v.color === color.name && v.quantity > 0,
            );

            return (
              <button
                key={color.name}
                type="button"
                disabled={isOutOfStock}
                onClick={() => {
                  if (isOutOfStock) return;

                  setSelectedColor(color.name);

                  if (color.image) {
                    setSelectedImage(color.image);
                  }

                  // auto reset storage nếu variant không tồn tại
                  const hasVariant = product.variants.some(
                    (v) =>
                      v.color === color.name &&
                      v.storage === selectedStorage &&
                      v.quantity > 0,
                  );

                  if (!hasVariant) {
                    const firstAvailable = product.variants.find(
                      (v) => v.color === color.name && v.quantity > 0,
                    );

                    if (firstAvailable) {
                      setSelectedStorage(firstAvailable.storage);
                    }
                  }
                }}
                className={`color-chip-card ${
                  selectedColor === color.name ? "selected" : ""
                } ${isOutOfStock ? "out-of-stock" : ""}`}
              >
                <span
                  className="color-preview-circle"
                  style={{ backgroundColor: color.code }}
                />

                <span className="color-name-text">
                  {color.name}
                  {isOutOfStock && (
                    <span className="sold-out-text">Hết hàng</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ───────────── STORAGE ───────────── */}
      <div className="variant-interactive-group">
        <label className="group-label">Bộ nhớ trong:</label>

        <div className="storage-chips-flex">
          {storages.map((storage) => {
            const isOutOfStock = !product.variants.some(
              (v) =>
                v.storage === storage &&
                v.color === selectedColor &&
                v.quantity > 0,
            );

            return (
              <button
                key={storage}
                type="button"
                disabled={isOutOfStock}
                onClick={() => {
                  if (isOutOfStock) return;

                  setSelectedStorage(storage);

                  const matchedVariant =
                    product.variants.find(
                      (v) =>
                        v.storage === storage &&
                        v.color === selectedColor &&
                        v.quantity > 0,
                    ) ||
                    product.variants.find(
                      (v) => v.storage === storage && v.quantity > 0,
                    );

                  if (matchedVariant?.image) {
                    setSelectedImage(matchedVariant.image);
                  }
                }}
                className={`storage-chip-card ${
                  selectedStorage === storage ? "selected" : ""
                } ${isOutOfStock ? "out-of-stock" : ""}`}
              >
                {selectedStorage === storage && (
                  <Check size={12} className="check-icon-badge" />
                )}

                {storage}

                {isOutOfStock && (
                  <span className="sold-out-text">Hết hàng</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
