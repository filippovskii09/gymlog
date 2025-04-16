import useFallbackTimer from '@/hooks/useTimer';

const FollbackTimer = () => {
  const { minutes, seconds } = useFallbackTimer();

  return (
    <p className="text-xs sm:text-sm font-semibold text-center leading-6 text-acid gap-1">
      Повторний запит коду буде доступний через:{' '}
      <span className="text-base">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </span>
    </p>
  );
};

export default FollbackTimer;
