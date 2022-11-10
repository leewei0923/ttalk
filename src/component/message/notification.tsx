import { Notification } from '@arco-design/web-react';

interface ChatNotificationType {
  control: {
    title: string;
    content: string;
    icon?: React.ReactNode;
    duration?: number;
    getId?: (str: string) => string;
  };
  children?: React.ReactNode;
}

export function ChatNotification(props: ChatNotificationType): void {
  const {
    control: { title, content, icon, duration = 0, getId },
    children
  } = props;
  const id = `${Date.now()}`;

  if (typeof getId === 'function') {
    getId(id);
  }

  Notification.info({
    id,
    icon,
    title,
    content,
    duration,
    btn: children
  });
}
