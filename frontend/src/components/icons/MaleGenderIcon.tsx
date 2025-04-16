import { GenderIconProps } from '@/types/interface.interface';
import { FC } from 'react';

const MaleGenderIcon: FC<GenderIconProps> = ({ checked }) => {
  return (
    <svg width="72" height="75" viewBox="0 0 72 75" fill="none">
      <path
        d="M42.0458 31.1708L67.6941 4.32025M67.6941 4.32025L68 23.6196M67.6941 4.32025L49.2589 4M48.5665 47.6722C48.5665 60.5558 38.59 71 26.2833 71C13.9766 71 4 60.5558 4 47.6722C4 34.7886 13.9766 24.3444 26.2833 24.3444C38.59 24.3444 48.5665 34.7886 48.5665 47.6722Z"
        stroke={checked ? '#232323' : '#fff'}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MaleGenderIcon;
