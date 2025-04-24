'use client';

import BasicTextarea from '@/components/ui/BasicTextarea';
import { SURVEY_HEALTH_ROUTES } from '@/enums/survey.enum';
import { setHealthInfoItem } from '@/features/slices/survey/healthInfo.slice';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import QuestionRenderer from '../../question/QuestionRenderer';

const ContraindicationsPicker = () => {
  const { contraindications } = useSelector((state: RootState) => state.survey.healthInfo);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <QuestionRenderer
      title="Чи маєш ти медичні протипоказання до фізичних навантажень?"
      text="Наприклад, серцево-судинні захворювання, проблеми з суглобами або інші хронічні стани, які потрібно врахувати. Якщо таких немає — просто залиш порожнім"
      redirectPath={SURVEY_HEALTH_ROUTES.RESTRICTIONS}
    >
      <BasicTextarea
        label="Опис проблеми"
        placeholder="Введіть детальний опис"
        value={contraindications}
        onChange={(e) =>
          dispatch(setHealthInfoItem({ key: 'contraindications', value: e.target.value }))
        }
        wrapperClassName="mt-4"
        labelClassName="text-white"
      />
    </QuestionRenderer>
  );
};

export default ContraindicationsPicker;
