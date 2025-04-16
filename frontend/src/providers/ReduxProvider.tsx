'use client';

import RefreshTokenInitializer from '@/components/RefreshTokenInitializer';
import { persistor, store } from '@/store/store';
import { ChildrenProps } from '@/types/interface.interface';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const ReduxProvider: FC<ChildrenProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RefreshTokenInitializer />
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
