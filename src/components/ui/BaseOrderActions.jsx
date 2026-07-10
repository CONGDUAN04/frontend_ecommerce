import { Button } from "antd";
import "../../styles/button/BaseOrderActions.css";

export default function BaseOrderActions({
  actions = [],
  layout = "vertical",
}) {
  return (
    <div className={`order-card-footer order-card-footer--${layout}`}>
      {actions.map((action) => (
        <Button
          key={action.key}
          block={layout === "vertical"}
          disabled={action.disabled}
          className={`order-action-btn order-action-btn--${action.variant || "default"}`}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
