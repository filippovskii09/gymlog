import CongratulationsIcon from '@/components/icons/CongratulationsIcon';
import { ROUTES } from '@/constants/constants';
import Link from 'next/link';

const SurveySuccessPage = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-20 pb-20 px-6">
      <h1 className="text-2xl mb-10 text-center text-acid">Дякуємо! Анкету успішно завершено</h1>
      <CongratulationsIcon />
      <p className="text-center mt-10 text-xl">
        На основі твоїх відповідей ми вже підбираємо для тебе найкращу програму тренувань.
      </p>
      <Link
        className="mt-8 rounded-4xl w-full bg-acid text-dark-purple h-12 flex items-center justify-center font-medium text-lg"
        href={ROUTES.HOME}
      >
        Перейти на головну
      </Link>
    </div>
  );
};

export default SurveySuccessPage;
