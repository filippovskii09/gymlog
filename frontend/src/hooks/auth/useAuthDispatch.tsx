import { setVerifyEmail } from '@/features/slices/auth/auth.slice';
import { setUser } from '@/features/slices/user/user.slice';
import { AppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';

const useAuthDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();

  const setLoginUser = (response: { user: unknown }) =>
    dispatch(setUser((response as { user: unknown }).user));
  const setForgotPasswordUserEmail = (formData: { email: string }) =>
    dispatch(setVerifyEmail(formData.email as string));

  return {
    setLoginUser,
    setForgotPasswordUserEmail,
  };
};

export default useAuthDispatch;
