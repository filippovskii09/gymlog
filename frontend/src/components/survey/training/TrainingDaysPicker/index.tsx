'use client';

import CustomCheckbox from '@/components/ui/CustomCheckbox';
import { USER_CONSTANTS } from '@/constants/survey.constants';
import { SURVEY_TRAINING_ROUTES } from '@/enums/survey.enum';
import { setTrainingInfoItem } from '@/features/slices/survey/trainingInfo.slice';
import { AppDispatch, RootState } from '@/store/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionRenderer from '../../question/QuestionRenderer';

const TrainingDaysPicker = () => {
  const { trainingDays } = useSelector((state: RootState) => state.survey.trainingInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [selected, setSelected] = useState<string | number>(trainingDays);

  return (
    <QuestionRenderer
      title="Скільки днів на тиждень готовий(-а) виділяти на тренування?"
      redirectPath={SURVEY_TRAINING_ROUTES.TRAINING_TIME}
    >
      <div className="text-center mt-10 flex flex-col gap-5">
        {USER_CONSTANTS.TRAINING_DAYS.map((opt) => (
          <CustomCheckbox
            key={opt}
            label={String(opt)}
            checked={selected === opt}
            onChange={() => {
              setSelected(opt);
              dispatch(setTrainingInfoItem({ key: 'trainingDays', value: String(opt) }));
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
export default TrainingDaysPicker;
