import { beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "vue";
import { createRouter, createMemoryHistory } from "vue-router";
import type { App } from "vue";
import type { Router } from "vue-router";
import MainApp from "@/App.vue";
import { errorTracking } from "@/utilities/";

import * as Sentry from "@sentry/vue";

describe("errorTracking", () => {
  let app: App<Element>;
  let router: Router;

  beforeEach(() => {
    vi.stubEnv("VITE_APP_SENTRY_DSN", "production");
    app = createApp(MainApp);
    router = createRouter({
      history: createMemoryHistory(),
      routes: [],
    });
  });

  it("should initialize Sentry if dsn is provided", () => {
    const fakeSentryDsn = "https://ew@1.ingest.sentry.io/1";

    const initSpy = vi.spyOn(Sentry, "init");

    const mockedEnv = {
      sentryDsn: fakeSentryDsn,
      environment: "test",
    };

    errorTracking.init(app, router, mockedEnv);
    expect(initSpy).toHaveBeenCalledOnce();
  });

  it("should not initialize Sentry if dsn is not provided", () => {
    const initSpy = vi.spyOn(Sentry, "init");
    const consoleSpy = vi.spyOn(console, "error");

    const mockedEnv = {
      sentryDsn: undefined,
      environment: "test",
    };

    // @ts-ignore
    errorTracking.init(app, router, mockedEnv);
    expect(initSpy).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith("Sentry DSN not found");
  });

  it("should capture an error", () => {
    const error = new Error("Test error");
    const context = { extra: "context" };
    const captureExceptionSpy = vi.spyOn(Sentry, "captureException");

    errorTracking.captureError(error, context);

    expect(captureExceptionSpy).toHaveBeenCalledWith(error, context);
  });

  it("should call Sentry.setUser with a valid user", () => {
    const validUser = { id: "123", email: "testUser" };
    const setUserSpy = vi.spyOn(Sentry, "setUser");

    errorTracking.setUser(validUser);

    expect(setUserSpy).toHaveBeenCalledWith(validUser);
  });

  it("should throw an error when user.id is not defined", () => {
    const invalidUser = { email: "testUser" };

    // Using an arrow function to wrap errorTracking.setUser, so that we can test if an error is thrown
    const setUserCall = () => errorTracking.setUser(invalidUser as Sentry.User);

    expect(setUserCall).toThrowError("User must have an id");
  });
});
