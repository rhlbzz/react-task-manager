import React from 'react';
import styles from '../../styles/components/StatusComponent.module.scss';
import { Status } from '@/types';

interface StatusComponentProps {
  status: Status;
}

const StatusComponent: React.FC<StatusComponentProps> = ({ status }) => {
  return (
    <span className={`uppercase inline-block mx-auto p-2 ${styles[status.toLowerCase()]}`}>{status}</span>
  );
};
export default StatusComponent;