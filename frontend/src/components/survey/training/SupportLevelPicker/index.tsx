'use client';

import CustomCheckbox from '@/components/ui/CustomCheckbox';
import { USER_CONSTANTS } from '@/constants/survey.constants';
import { setTrainingInfoItem } from '@/features/slices/survey/trainingInfo.slice';
import { AppDispatch, RootState } from '@/store/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionRenderer from '../../question/QuestionRenderer';

const SupportLevelPicker = () => {
  const { supportLevel } = useSelector((state: RootState) => state.survey.trainingInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [selected, setSelected] = useState<string | number>(supportLevel);

  return (
    <QuestionRenderer
      title="Який рівень підтримки тобі потрібен?"
      text="Хочеш просто план і сам усе виконуєш? Чи потрібна мотивація, поради та фідбек"
      isTrainingInfoSubmit={true}
    >
      <div className="text-center mt-10 flex flex-col gap-5">
        {USER_CONSTANTS.SUPPORT_LEVELS.map((opt) => (
          <CustomCheckbox
            key={opt}
            label={String(opt)}
            checked={selected === opt}
            onChange={() => {
              setSelected(opt);
              dispatch(setTrainingInfoItem({ key: 'supportLevel', value: String(opt) }));
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

export default SupportLevelPicker;
