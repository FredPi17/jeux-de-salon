export default class Env {
  static readonly environment: string = import.meta.env.MODE;
  static readonly backendUrl: string = import.meta.env.VITE_APP_BACKEND_URL;
}
