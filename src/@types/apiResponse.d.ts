interface ApiResponse {
  ok: boolean;
  message?: string;
  user?: Me;
  server?: Server;
  channel?: Channel;
  error?: ApiError;
}

interface ApiError {
  message: string;
  status: number;
}
