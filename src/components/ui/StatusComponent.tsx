import React from 'react';
import styles from '../../styles/components/StatusComponent.module.scss';

type Status = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE';

enum StatusValue {
  BACKLOG = 'Backlog',
  TODO = 'Todo',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done'
}
enum StatusStyle {
  BACKLOG = 'backlog',
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done'
}
interface StatusComponentProps {
  status: Status;
}

const StatusComponent: React.FC<StatusComponentProps> = ({ status }) => {
  const statusStyle = StatusStyle[status]
  return (
    <span className={`uppercase inline-block mx-auto p-2 ${styles[statusStyle]}`}>{StatusValue[status]}</span>
  );
};
export default StatusComponent;