import VerifyCodeForm from '@/components/auth/VerifyCodeForm';
import AuthLayout from '@/components/layouts/AuthLayout';

const VerifyCodePage = () => {
  return (
    <AuthLayout title={'Verify Code'}>
      <p className={'mb-10 px-4 py-8 text-center text-xl font-bold'}>
        Please enter your verify code, sended on your email!
      </p>
      <VerifyCodeForm />
    </AuthLayout>
  );
};

export default VerifyCodePage;
