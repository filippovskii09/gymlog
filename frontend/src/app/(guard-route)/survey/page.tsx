import SetupViewImage from '@/assets/images/setup-first-screen.png';
import BasicButton from '@/components/ui/BasicButton';
import { SURVEY_GENRAL_ROUTES } from '@/enums/survey.enum';
import Image from 'next/image';

const SurveyPage = () => {
  return (
    <>
      <div className={'relative -mt-10 h-[463px] min-h-[400px] w-full'}>
        <Image
          src={SetupViewImage}
          layout="fill"
          alt="Setup View Image"
          className={'absolute h-full w-full object-cover'}
        />
      </div>
      <h1 className={'text-acid mx-auto max-w-[328px] py-8 text-center text-2xl font-medium'}>
        Послідовність — ключ до прогресу. Не здавайся!
      </h1>
      <div className={'bg-light-purple mb-6 px-6 py-7 text-center'}>
        Перед тим як розпочати, допоможи нам краще тебе зрозуміти. <br />
        Відповідай на декілька запитань — і ми створимо персоналізовану програму тренувань, яка
        ідеально підходить саме тобі.
        <br />
        Це займе всього кілька хвилин, але результат вартує того.
      </div>
      <BasicButton buttonText={'Next'} redirectPath={SURVEY_GENRAL_ROUTES.AGE} />
    </>
  );
};

export default SurveyPage;
