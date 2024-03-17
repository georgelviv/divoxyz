import classNames from 'classnames';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const Card = ({ title, ...props }: CardProps) => {
  const divClass: string = classNames(
    'rounded-2xl h-full w-full p-4 overflow-hidden',
    'bg-slate-50 border border-transparent dark:border-white/[0.2]',
    'group-hover:border-slate-300 relative z-20'
  );

  return (
    <div className={divClass} {...props}>
      {title}
    </div>
  );
};

export default Card;
