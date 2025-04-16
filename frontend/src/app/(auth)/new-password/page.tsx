import NewPasswordForm from '@/components/auth/NewPasswordForm';
import AuthLayout from '@/components/layouts/AuthLayout';

const NewPasswordPage = () => {
  return (
    <AuthLayout title={'Enter your new password'}>
      <p className={'mb-10 px-4 py-8 text-center text-xl font-bold'}>New pasword</p>
      <NewPasswordForm />
    </AuthLayout>
  );
};

export default NewPasswordPage;
