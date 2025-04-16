import { FC } from 'react';

interface InputLabelProps {
  name: string | undefined;
  label: string;
}

const InputLabel: FC<InputLabelProps> = ({ name, label }) => {
  return (
    <label htmlFor={name} className="text-main-black mb-1 block">
      {label}
    </label>
  );
};

export default InputLabel;
