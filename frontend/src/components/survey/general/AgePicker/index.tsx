'use client';

import BasicInput from '@/components/ui/BasicInput';
import { SURVEY_GENRAL_ROUTES } from '@/enums/survey.enum';
import { setGeneralInfoItem } from '@/features/slices/survey/generallnfo.slice';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import QuestionRenderer from '../../question/QuestionRenderer';

const AgePicker = () => {
  const { age } = useSelector((state: RootState) => state.survey.generalInfo);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <QuestionRenderer title="Скільки тобі років?" redirectPath={SURVEY_GENRAL_ROUTES.GENDER}>
      <BasicInput
        label="Введіть свій вік"
        type="number"
        value={age}
        placeholder="Введіть свій вік"
        labelClassName="text-white"
        wrapperClassName="mt-10"
        onChange={(e) => dispatch(setGeneralInfoItem({ key: 'age', value: e.target.value }))}
      />
    </QuestionRenderer>
  );
};

export default AgePicker;
