import React from 'react';
import styles from '../../styles/components/StatusComponent.module.scss';
import { STATUS } from '@/types';
import { StatusStyle, StatusValue } from '@/contants';

interface StatusComponentProps {
  status: STATUS;
}

const StatusComponent: React.FC<StatusComponentProps> = ({ status }) => {
  const statusStyle = StatusStyle[status]
  console.log('StatusValue[status] ', StatusValue[status])
  return (
    <span className={`uppercase inline-block mx-auto p-2 ${styles[statusStyle]}`}>{StatusValue[status]}</span>
  );
};
export default StatusComponent;