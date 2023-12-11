import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";
import type { App } from "vue";
import type { Router } from "vue-router";

const init = (
  app: App<Element>,
  router: Router,
  Env: { sentryDsn: string; environment: string }
) => {
  if (!Env.sentryDsn) {
    console.error("Sentry DSN not found");
    return;
  }
  Sentry.init({
    app,
    dsn: Env.sentryDsn,
    environment: Env.environment,
    trackComponents: true,
    logErrors: true,
    release: __SENTRY_RELEASE__,
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
      new Sentry.Replay(),
    ],
    tracesSampleRate: 1.0,
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 1.0,
    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,
  });
};

const captureError = (error: Error, context?: object) => {
  Sentry.captureException(error, context);
};

const setUser = (user: Sentry.User | null) => {
  if (user && !user.id) {
    throw new Error("User must have an id");
  }
  Sentry.setUser(user);
};

export default { init, captureError, setUser };
