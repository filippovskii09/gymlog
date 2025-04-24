'use client';

import BasicTextarea from '@/components/ui/BasicTextarea';
import { SURVEY_TRAINING_ROUTES } from '@/enums/survey.enum';
import { setTrainingInfoItem } from '@/features/slices/survey/trainingInfo.slice';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import QuestionRenderer from '../../question/QuestionRenderer';

const AdditionalGoalPicker = () => {
  const { additionalGoal } = useSelector((state: RootState) => state.survey.trainingInfo);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <QuestionRenderer
      title="А ще? Можливо, є й друга мета?"
      text="Часто в нас є не одна ціль. Наприклад, схуднути і водночас стати більш витривалим."
      redirectPath={SURVEY_TRAINING_ROUTES.TRAINING_PLACES}
    >
      <BasicTextarea
        label="Опис цілі"
        placeholder="Введіть детальний опис"
        value={additionalGoal}
        onChange={(e) =>
          dispatch(setTrainingInfoItem({ key: 'additionalGoal', value: e.target.value }))
        }
        wrapperClassName="mt-4"
        labelClassName="text-white"
      />
    </QuestionRenderer>
  );
};

export default AdditionalGoalPicker;
