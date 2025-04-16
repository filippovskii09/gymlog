import RegisterForm from '@/components/auth/RegisterForm';
import AuthLayout from '@/components/layouts/AuthLayout';
import { ROUTES } from '@/constants/constants';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <AuthLayout
      title={'Create Account'}
      bottomText={
        <>
          Already have an account?
          <Link href={ROUTES.AUTH.LOGIN} className="text-acid pl-1">
            Log in
          </Link>
        </>
      }
    >
      <p className="px-4 py-8 text-center text-xl font-bold">Let's Start!</p>
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
