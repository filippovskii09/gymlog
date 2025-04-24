'use client';

import BasicInput from '@/components/ui/BasicInput';
import { setGeneralInfoItem } from '@/features/slices/survey/generallnfo.slice';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import QuestionRenderer from '../../question/QuestionRenderer';

const WeightPicker = () => {
  const { weight } = useSelector((state: RootState) => state.survey.generalInfo);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <QuestionRenderer title="Яка в тебе вага?" isGeneralInfoSubmit={true}>
      <BasicInput
        label="Введіть свою вагу(кг)"
        placeholder="Введіть вою вагу(кг)"
        type="number"
        value={weight}
        labelClassName="text-white"
        wrapperClassName="mt-10"
        onChange={(e) => dispatch(setGeneralInfoItem({ key: 'weight', value: e.target.value }))}
      />
    </QuestionRenderer>
  );
};

export default WeightPicker;
