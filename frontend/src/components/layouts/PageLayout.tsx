import { cn } from '@/utils/cn.util';
import { FC, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

const PageLayout: FC<PageLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn('flex h-screen flex-col py-10 max-w-xl mx-auto w-full', className)}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        aria-label="toast"
      />
    </div>
  );
};

export default PageLayout;
