'use client';

import FemaleGenderIcon from '@/components/icons/FemaleGenderIcon';
import MaleGenderIcon from '@/components/icons/MaleGenderIcon';
import CustomCheckbox from '@/components/ui/CustomCheckbox';
import Subtitle from '@/components/ui/Subtitle';
import { GENDERS } from '@/constants/constants';
import { SURVEY_GENRAL_ROUTES } from '@/enums/survey.enum';
import { setGeneralInfoItem } from '@/features/slices/survey/generallnfo.slice';
import { AppDispatch, RootState } from '@/store/store';
import { cn } from '@/utils/cn.util';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionRenderer from '../../question/QuestionRenderer';

const GenderPicker = () => {
  const { gender } = useSelector((state: RootState) => state.survey.generalInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedGender, setSelectedGender] = useState(gender);

  return (
    <QuestionRenderer
      title="Який твій гендер?"
      text="Це важливо для формування відповідних тренувальних програм та рівня навантаження."
      redirectPath={SURVEY_GENRAL_ROUTES.HEIGHT}
    >
      <div className="text-center mt-10 flex flex-col gap-5">
        <CustomCheckbox
          label={GENDERS.MALE}
          checked={selectedGender === GENDERS.MALE}
          onChange={() => {
            setSelectedGender(GENDERS.MALE);
            dispatch(setGeneralInfoItem({ key: 'gender', value: GENDERS.MALE }));
          }}
          type="radio"
          containerClassName={cn(
            'relative flex h-[163px] w-[163px] items-center justify-center rounded-full',
            selectedGender === GENDERS.MALE
              ? 'bg-acid border-none'
              : 'border border-white bg-[#373737]'
          )}
          textClassName="text-xl font-bold text-center"
        >
          <MaleGenderIcon checked={selectedGender === GENDERS.MALE} />
        </CustomCheckbox>
        <Subtitle title={GENDERS.MALE} />

        <CustomCheckbox
          label={GENDERS.FEMALE}
          checked={selectedGender === GENDERS.FEMALE}
          onChange={() => {
            setSelectedGender(GENDERS.FEMALE);
            dispatch(setGeneralInfoItem({ key: 'gender', value: GENDERS.MALE }));
          }}
          type="radio"
          containerClassName={cn(
            'relative flex h-[163px] w-[163px] items-center justify-center rounded-full',
            selectedGender === GENDERS.FEMALE
              ? 'bg-acid border-none'
              : 'border border-white bg-[#373737]'
          )}
          textClassName="text-xl font-bold text-center"
        >
          <FemaleGenderIcon checked={selectedGender === GENDERS.FEMALE} />
        </CustomCheckbox>
        <Subtitle title={GENDERS.FEMALE} />
      </div>
    </QuestionRenderer>
  );
};

export default GenderPicker;
