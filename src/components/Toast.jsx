import { Show } from "solid-js";
import Icon from "./Icon";
import { useTrip } from "../state";

export default function Toast() {
  const { toast, dismissToast } = useTrip();

  return (
    <Show when={toast()}>
      <div class="toast" role="status" aria-live="polite" aria-atomic="true">
        <span class="toast-icon">
          <Icon name="check" size={14} />
        </span>
        <span class="toast-msg">{toast().message}</span>
        <Show when={toast().undo}>
          <button type="button"
            class="toast-undo"
            onClick={() => {
              toast().undo();
              dismissToast();
            }}
          >
            Undo
          </button>
        </Show>
        <button type="button" class="toast-close" aria-label="Dismiss" onClick={dismissToast}>
          <Icon name="trash" size={12} />
        </button>
      </div>
    </Show>
  );
}
