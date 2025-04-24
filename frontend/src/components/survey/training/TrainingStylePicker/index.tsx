'use client';

import CustomCheckbox from '@/components/ui/CustomCheckbox';
import { USER_CONSTANTS } from '@/constants/survey.constants';
import { SURVEY_TRAINING_ROUTES } from '@/enums/survey.enum';
import { setTrainingInfoItem } from '@/features/slices/survey/trainingInfo.slice';
import { AppDispatch, RootState } from '@/store/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionRenderer from '../../question/QuestionRenderer';

const TrainingStylePicker = () => {
  const { trainingStyle } = useSelector((state: RootState) => state.survey.trainingInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [selected, setSelected] = useState<string | number>(trainingStyle);

  return (
    <QuestionRenderer
      title="Який тип тренувань тобі найбільше до вподоби?"
      text="Обери свій вайб."
      redirectPath={SURVEY_TRAINING_ROUTES.SUPPORT_LEVELS}
    >
      <div className="text-center mt-10 flex flex-col gap-5">
        {USER_CONSTANTS.TRAINING_STYLE.map((opt) => (
          <CustomCheckbox
            key={opt}
            label={String(opt)}
            checked={selected === opt}
            onChange={() => {
              setSelected(opt);
              dispatch(setTrainingInfoItem({ key: 'trainingStyle', value: String(opt) }));
            }}
            type="checkbox"
            containerClassName={`justify-between px-3 py-2.5 rounded-[36px] border border-white pl-7 
						${selected === opt ? 'bg-main-black' : 'bg-white text-black'}`}
            textClassName="text-lg font-normal"
          />
        ))}
      </div>
    </QuestionRenderer>
  );
};

export default TrainingStylePicker;
