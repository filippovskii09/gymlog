'use client';

import BackButton from '@/components/ui/BackButton';
import BasicButton from '@/components/ui/BasicButton';
import useQuestionRenderer from '@/hooks/useQuestionRenderer';
import { FC, ReactNode } from 'react';

interface QuestionRendererProps {
  title: string;
  text?: string;
  children?: ReactNode;
  redirectPath?: string;
  buttonText?: string;
  isGeneralInfoSubmit?: boolean;
  isHealthInfoSubmit?: boolean;
  isTrainingInfoSubmit?: boolean;
}

const QuestionRenderer: FC<QuestionRendererProps> = ({
  title,
  text,
  children,
  redirectPath,
  buttonText,
  isGeneralInfoSubmit,
  isHealthInfoSubmit,
  isTrainingInfoSubmit,
}) => {
  const handleClick = useQuestionRenderer(
    isGeneralInfoSubmit,
    isHealthInfoSubmit,
    isTrainingInfoSubmit
  );

  return (
    <div className="flex flex-col h-full gap-4">
      <BackButton>
        <p className={'text-acid font-semibold'}>Back</p>
      </BackButton>
      <div className="flex-1 px-4 flex flex-col">
        <h1 className={'px-8 py-10 text-center text-2xl font-bold text-acid'}>{title}</h1>
        {text && <p className={'mx-auto max-w-[328px] text-center'}>{text}</p>}
        {children}
      </div>
      <BasicButton
        redirectPath={redirectPath || ''}
        buttonText={buttonText || 'Next step'}
        onClick={handleClick}
      />
    </div>
  );
};

export default QuestionRenderer;
