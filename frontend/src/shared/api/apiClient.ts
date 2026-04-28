import axios from "axios";


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
        if (!error.response) {
            error.code = "INTERNAL_ERROR";
            error.message = "Сервис временно недоступен. Попробуйте позже"
        }

        return Promise.reject(error);
    }
)

