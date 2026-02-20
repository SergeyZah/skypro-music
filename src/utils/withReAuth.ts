import { refreshToken } from "@/services/auth/authApi";
import { setAccessToken } from "@/store/features/authSlice";
import { AppDispatch } from "@/store/store";
import { AxiosError } from "axios";

export const withReauth = async <T>(
  apiFunction: (access: string) => Promise<T>,
  refresh: string,
  dispatch: AppDispatch,
): Promise<T> => {
  try {
    // Пытаемся выполнить запрос
    return await apiFunction('');
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.status)

    // Если ошибка 401, обновляем токен и повторяем запрос
    if (axiosError.response?.status === 401) {
      console.log('Обновление токена и повторный запрос')
      try {
        const newAccessToken = await refreshToken(refresh); // Обновляем токен
        dispatch(setAccessToken(newAccessToken.access));
        // Повторяем исходный запрос
        return await apiFunction(newAccessToken.access);
      } catch (refreshError) {
        // Если обновление токена не удалось, пробрасываем ошибку
        console.log(refreshError)
        throw refreshError;
      }
    }

    // Если ошибка не 401, пробрасываем её
    console.log(error)
    throw error;
  }
};