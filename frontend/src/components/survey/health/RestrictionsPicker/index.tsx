'use client';

import BasicTextarea from '@/components/ui/BasicTextarea';
import { SURVEY_HEALTH_ROUTES } from '@/enums/survey.enum';
import { setHealthInfoItem } from '@/features/slices/survey/healthInfo.slice';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import QuestionRenderer from '../../question/QuestionRenderer';

const RestrictionsPicker = () => {
  const { restrictions } = useSelector((state: RootState) => state.survey.healthInfo);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <QuestionRenderer
      title="Чи маєш фізичні або побутові обмеження, які впливають на тренування?"
      text="Наприклад, немає часу на довгі тренування, не можеш займатись на підлозі, не маєш доступу до залу тощо."
      redirectPath={SURVEY_HEALTH_ROUTES.TRAINING_EXPERIENCE}
    >
      <BasicTextarea
        label="Опис проблеми"
        placeholder="Введіть детальний опис"
        value={restrictions}
        onChange={(e) =>
          dispatch(setHealthInfoItem({ key: 'restrictions', value: e.target.value }))
        }
        wrapperClassName="mt-4"
        labelClassName="text-white"
      />
    </QuestionRenderer>
  );
};

export default RestrictionsPicker;
