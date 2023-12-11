import { createPinia } from "pinia";

export const store = createPinia();

/*
1. createPinia() creates a new Pinia store instance, which is assigned to the store variable.
2. The useUserStore function is imported from '@/modules/user'. This function is a store factory, which means it creates a new instance of the store when called.
3. When you call useUserStore(store), you are creating an instance of the user store and associating it with the store instance.
This can be useful when you want to access the store instance outside of a Vue component, for example, during server-side rendering, testing, or initialization.

In most cases, you can simply use the useUserStore() function directly inside your Vue components without passing the store instance,
and Pinia will take care of creating the store instance and associating it with the correct Pinia store.

However, if you want to access the store instance outside of a Vue component,
 or if you want to ensure that the store is registered and initialized during the application's bootstrapping process,
 you might want to register it explicitly by calling useUserStore(store).
 */
