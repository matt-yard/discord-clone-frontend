interface ApiResponse {
  ok: boolean;
  message?: string;
  user?: User;
  server?: Server;
  channel?: Channel;
  error?: ApiError;
}

interface ApiError {
  message: string;
  status: number;
}
