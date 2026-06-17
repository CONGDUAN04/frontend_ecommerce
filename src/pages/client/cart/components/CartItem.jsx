import { Trash2, Plus, Minus } from "lucide-react";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-item-card">
      <div className="item-image">
        <img
          src={item.variant.productColor.image}
          alt={item.variant.product.name}
        />
      </div>

      <div className="item-details">
        <h3 className="item-name">{item.variant.product.name}</h3>

        <p className="item-variant">
          {item.variant.productColor?.color?.name} · {item.variant.storage}
        </p>

        <div className="item-actions">
          <div className="quantity-control">
            <button onClick={() => onDecrease(item)}>
              <Minus size={14} />
            </button>

            <span>{item.quantity}</span>

            <button onClick={() => onIncrease(item)}>
              <Plus size={14} />
            </button>
          </div>

          <button className="remove-btn-text" onClick={() => onRemove(item.id)}>
            <Trash2 size={16} />
            Xóa
          </button>
        </div>
      </div>

      <div className="item-price">
        {(item.price * item.quantity).toLocaleString()}đ
      </div>
    </div>
  );
}
