import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import AuthLayout from '@/components/layouts/AuthLayout';

const ForgotPasswordPage = () => {
  return (
    <AuthLayout title={'Forgotten Password'}>
      <p className={'mb-10 px-4 py-8 text-center text-xl font-bold'}>Forgot password?</p>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
