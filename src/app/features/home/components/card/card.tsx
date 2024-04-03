import { Post } from '@core/models/core.models';
import { Button } from '@shared/components/button';
import { DateLabel } from '@shared/components/date-label';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

interface CardProps {
  post: Post;
}

const divClass: string = classNames(
  'rounded-2xl h-full w-full p-4 overflow-hidden',
  'bg-background-secondary border border-transparent dark:border-white/[0.2]',
  'relative z-20 border-primary',
  'flex flex-col gap-5'
);

const Card = ({ post }: CardProps) => {
  const [, setSearchParams] = useSearchParams();

  const handleTagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: string
  ) => {
    e.preventDefault();

    const searchParams = new URLSearchParams();
    searchParams.set('q', tag);
    setSearchParams(searchParams);
  };

  return (
    <div className={divClass}>
      <div className="flex justify-end">
        <DateLabel date={post.date} />
      </div>
      <div className="text-primary font-medium text-xl">{post.title}</div>
      <div className="text-sm text-secondary flex-grow">{post.description}</div>
      <ul className="flex text-sm text-secondary">
        {post.tags.map((tag: string, index: number) => {
          return (
            <li key={index}>
              <Button
                onClick={(e) => handleTagClick(e, tag)}
                extraClasses={classNames({ 'pl-0': index === 0 })}
                theme="text"
              >
                #{tag}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Card.displayName = 'Card';

export default Card;
