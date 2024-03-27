import { formateISODate } from '@shared/utils/general.utils';
import classNames from 'classnames';

interface CardProps {
  title: string;
  description: string;
  date: string;
}

const Card = ({ title, description, date }: CardProps) => {
  const divClass: string = classNames(
    'rounded-2xl h-full w-full p-4 overflow-hidden',
    'bg-background-secondary border border-transparent dark:border-white/[0.2]',
    'relative z-20 border-primary'
  );

  return (
    <div className={divClass}>
      <div className="flex justify-end">
        <time dateTime={date} className="text-xs text-secondary">
          {formateISODate(date)}
        </time>
      </div>
      <div className="mb-5 text-primary font-medium text-xl">{title}</div>
      <div className="text-sm text-secondary">{description}</div>
    </div>
  );
};

Card.displayName = 'Card';

export default Card;
