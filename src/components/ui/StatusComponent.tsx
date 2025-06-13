import React from 'react';
import styles from '../../styles/components/StatusComponent.module.scss';
import { STATUS } from '@/types';

interface StatusComponentProps {
  status: STATUS;
}

const StatusComponent: React.FC<StatusComponentProps> = ({ status }) => {
  return (
    <span className={`uppercase inline-block mx-auto p-2 ${styles[status.toLocaleLowerCase()]}`}>{status}</span>
  );
};
export default StatusComponent;