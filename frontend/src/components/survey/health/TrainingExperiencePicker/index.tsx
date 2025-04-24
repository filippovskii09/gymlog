'use client';

import CustomCheckbox from '@/components/ui/CustomCheckbox';
import { USER_CONSTANTS } from '@/constants/survey.constants';
import { SURVEY_HEALTH_ROUTES } from '@/enums/survey.enum';
import { setHealthInfoItem } from '@/features/slices/survey/healthInfo.slice';
import { AppDispatch, RootState } from '@/store/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionRenderer from '../../question/QuestionRenderer';

const TrainingExperiencePicker = () => {
  const { trainingExperience } = useSelector((state: RootState) => state.survey.healthInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [selected, setSelected] = useState(trainingExperience);

  return (
    <QuestionRenderer
      title="Який у тебе досвід регулярних тренувань?"
      redirectPath={SURVEY_HEALTH_ROUTES.FITNESS_LEVELS}
    >
      <div className="text-center mt-10 flex flex-col gap-5">
        {USER_CONSTANTS.TRAINING_EXPERIENCE.map((opt) => (
          <CustomCheckbox
            key={opt}
            label={opt}
            checked={selected === opt}
            onChange={() => {
              setSelected(opt);
              dispatch(setHealthInfoItem({ key: 'trainingExperience', value: opt }));
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

export default TrainingExperiencePicker;
