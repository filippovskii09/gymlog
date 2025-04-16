import { Eye, EyeOff } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';

type ShowPasswordEyeProps = {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
};

const ShowPasswordEye: FC<ShowPasswordEyeProps> = ({ showPassword, setShowPassword }) => {
  return (
    <button
      type="button"
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:scale-115"
      onClick={() => setShowPassword((prev) => !prev)}
    >
      {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  );
};

export default ShowPasswordEye;
