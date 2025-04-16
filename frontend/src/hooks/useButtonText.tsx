import { BUTTON_TEXTS } from '@/constants/constants';
import { useMemo } from 'react';

type UseButtonTextParams = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  defaultText: string;
};

const useButtonText = ({ isLoading, isSuccess, isError, defaultText }: UseButtonTextParams) =>
  useMemo(() => {
    if (isLoading) {
      return BUTTON_TEXTS.STATES.LOADING;
    } else if (isSuccess) {
      return BUTTON_TEXTS.STATES.SUCCESS;
    } else if (isError) {
      return BUTTON_TEXTS.STATES.ERROR;
    }
    return defaultText;
  }, [isLoading, isSuccess, isError, defaultText]);

export default useButtonText;
