'use client';

import CustomCheckbox from '@/components/ui/CustomCheckbox';
import { SURVEY_HEALTH_ROUTES } from '@/enums/survey.enum';
import { setHealthInfoItem } from '@/features/slices/survey/healthInfo.slice';
import { AppDispatch, RootState } from '@/store/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionRenderer from '../../question/QuestionRenderer';
import { USER_CONSTANTS } from '@/constants/survey.constants';

const FitnessLevelsPicker = () => {
  const { fitnessLevels } = useSelector((state: RootState) => state.survey.healthInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [selected, setSelected] = useState(fitnessLevels);

  return (
    <QuestionRenderer
      title="Як би ти оцінив(ла) свій рівень фізичної підготовки?"
      redirectPath={SURVEY_HEALTH_ROUTES.RECENT_WORKOUTS}
    >
      <div className="text-center mt-10 flex flex-col gap-5">
        {USER_CONSTANTS.FITNESS_LEVELS.map((opt) => (
          <CustomCheckbox
            key={opt}
            label={opt}
            checked={selected === opt}
            onChange={() => {
              setSelected(opt);
              dispatch(setHealthInfoItem({ key: 'fitnessLevels', value: opt }));
            }}
            type="radio"
            containerClassName={`justify-between px-3 py-2.5 rounded-[36px] border border-white pl-7 
						${selected === opt ? 'bg-main-black' : 'bg-white text-black'}`}
            textClassName="text-lg font-normal"
          />
        ))}
      </div>
    </QuestionRenderer>
  );
};

export default FitnessLevelsPicker;
