'use client';

import CustomCheckbox from '@/components/ui/CustomCheckbox';
import { USER_CONSTANTS } from '@/constants/survey.constants';
import { setHealthInfoItem } from '@/features/slices/survey/healthInfo.slice';
import { AppDispatch, RootState } from '@/store/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionRenderer from '../../question/QuestionRenderer';

const RecentWorkoutsPicker = () => {
  const { numberOfRecentWorkouts } = useSelector((state: RootState) => state.survey.healthInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [selected, setSelected] = useState(numberOfRecentWorkouts);

  return (
    <QuestionRenderer
      title="Скільки тренувань у тебе було за останній тиждень?"
      text="Це допоможе оцінити твою активність та обрати оптимальний старт."
      isHealthInfoSubmit={true}
    >
      <div className="text-center mt-10 flex flex-col gap-5">
        {USER_CONSTANTS.RECENT_WORKOUTS.map((opt) => (
          <CustomCheckbox
            key={opt}
            label={opt}
            checked={selected === opt}
            onChange={() => {
              setSelected(opt);
              dispatch(setHealthInfoItem({ key: 'numberOfRecentWorkouts', value: opt }));
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

export default RecentWorkoutsPicker;
