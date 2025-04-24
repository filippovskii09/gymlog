'use client';

import {
  SURVEY_HEALTH_ROUTES,
  SURVEY_SUCCESS_ROUTE,
  SURVEY_TRAINING_ROUTES,
} from '@/enums/survey.enum';
import {
  useSetGeneralInfoMutation,
  useSetHealthInfoMutation,
  useSetTrainingInfoMutation,
} from '@/features/api/surveyApi';
import { clearSurveyStorage } from '@/features/persist';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useQuestionRenderer = (
  isGeneralInfoSubmit: boolean | undefined,
  isHealthInfoSubmit: boolean | undefined,
  isTrainingInfoSubmit: boolean | undefined
) => {
  // @ts-ignore
  const email = useSelector((state: RootState) => state.user.user.email);
  const { generalInfo, healthInfo, trainingInfo } = useSelector((state: RootState) => state.survey);
  const router = useRouter();

  const [setGeneralInfo, { isSuccess: isGeneralInfoSuccess }] = useSetGeneralInfoMutation();
  const [setHealthInfo, { isSuccess: isHealthInfoSuccess }] = useSetHealthInfoMutation();
  const [setTrainingInfo, { isSuccess: isTrainingInfoSuccess }] = useSetTrainingInfoMutation();

  const handleClick = () => {
    if (isGeneralInfoSubmit) {
      setGeneralInfo({ email, ...generalInfo });
    } else if (isHealthInfoSubmit) {
      setHealthInfo({ email, ...healthInfo });
    } else if (isTrainingInfoSubmit) {
      setTrainingInfo({ email, ...trainingInfo, isSurveyCompleted: true });
    }
  };

  useEffect(() => {
    if (isGeneralInfoSuccess && isGeneralInfoSubmit) {
      router.push(SURVEY_HEALTH_ROUTES.CONTRAINDICATIONS);
    } else if (isHealthInfoSuccess && isHealthInfoSubmit) {
      router.push(SURVEY_TRAINING_ROUTES.GOAL);
    } else if (isTrainingInfoSuccess && isTrainingInfoSubmit) {
      clearSurveyStorage();
      router.push(SURVEY_SUCCESS_ROUTE.INDEX);
    }
  }, [
    isGeneralInfoSubmit,
    isGeneralInfoSuccess,
    isHealthInfoSuccess,
    isTrainingInfoSubmit,
    isHealthInfoSubmit,
    isTrainingInfoSuccess,
    router,
  ]);

  return handleClick;
};

export default useQuestionRenderer;
