import axios from "axios";

export type ErrorResponseDto = {
  code: string
  message: string
  details?: unknown
  timestamp?: Date
}

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.response.use(
    (response) => response,

    async (error) => {
        console.log(error.response)
        if (!error.response) {
            const apiError: ErrorResponseDto = {
              code: "INTERNAL_ERROR",
              message: "Сервис временно недоступен. Попробуйте позже"
            }
            return Promise.reject(apiError);
        }
        return Promise.reject(error.response.data as ErrorResponseDto);
    }
)

