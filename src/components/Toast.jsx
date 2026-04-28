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
          <button
            class="toast-undo"
            onclick={() => {
              toast().undo();
              dismissToast();
            }}
          >
            Undo
          </button>
        </Show>
        <button class="toast-close" aria-label="Dismiss" onclick={dismissToast}>
          <Icon name="trash" size={12} />
        </button>
      </div>
    </Show>
  );
}
