import { ref } from "vue";
import type { Store } from "pinia";

export function getActionStatus(store: Store, actionName: string) {
  const isPending = ref(false);
  const error = ref();

  const unsubscribe = store.$onAction(async ({ name, after, onError }) => {
    if (name === actionName) {
      isPending.value = true;

      after(() => {
        isPending.value = false;
      });

      onError((err: unknown) => {
        isPending.value = false;
        error.value = err;
      });
    }
  });

  return { isPending, unsubscribe, error };
}
