import { ReactNode } from 'react';

export interface GenderIconProps {
  checked: boolean;
}

export interface ChildrenProps {
  children?: ReactNode;
}

export interface ClassName {
  className?: string;
}

export interface User {
  name?: string;
  email?: string;
  id?: string;
  _id: string;
  username: string;
  avatar?: string;
  status: 'online' | 'offline';
}
