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
          {colors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => {
                setSelectedColor(color.name);

                if (color.image) {
                  setSelectedImage(color.image);
                }
              }}
              className={`color-chip-card ${
                selectedColor === color.name ? "selected" : ""
              }`}
            >
              <span
                className="color-preview-circle"
                style={{
                  backgroundColor: color.code,
                }}
              />

              <span className="color-name-text">{color.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="variant-interactive-group">
        <label className="group-label">Bộ nhớ trong:</label>

        <div className="storage-chips-flex">
          {storages.map((storage) => (
            <button
              key={storage}
              type="button"
              onClick={() => {
                setSelectedStorage(storage);

                const matchedVariant =
                  product.variants.find(
                    (v) => v.storage === storage && v.color === selectedColor,
                  ) || product.variants.find((v) => v.storage === storage);

                if (matchedVariant?.image) {
                  setSelectedImage(matchedVariant.image);
                }
              }}
              className={`storage-chip-card ${
                selectedStorage === storage ? "selected" : ""
              }`}
            >
              {selectedStorage === storage && (
                <Check size={12} className="check-icon-badge" />
              )}

              {storage}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
