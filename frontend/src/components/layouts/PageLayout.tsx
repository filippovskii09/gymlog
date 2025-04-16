import { cn } from '@/utils/cn.util';
import { FC, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

const PageLayout: FC<PageLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn('flex h-screen flex-col pt-10', className)}>
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
