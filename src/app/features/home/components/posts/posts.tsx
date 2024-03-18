import { useState } from 'react';
import { Card } from '../card';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import { Post } from '@core/models/core.models';
import { Link } from 'react-router-dom';

interface PostsProps {
  posts: Post[];
}

interface PostItemProps {
  post: Post;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

const PostItem = ({
  post,
  index,
  setHoveredIndex,
  hoveredIndex
}: PostItemProps) => {
  const motionSpanClass = classNames(
    'absolute inset-0 h-full w-full',
    'bg-neutral-200 dark:bg-background-primary/[0.8] block rounded-3xl'
  );

  const wrapperClass = classNames(
    'relative group block p-2 h-full w-full hover:cursor-pointer'
  );

  return (
    <Link
      to={`/post/${post.id}`}
      onMouseEnter={() => {
        setHoveredIndex(index);
      }}
      onMouseLeave={() => {
        setHoveredIndex(null);
      }}
      className={wrapperClass}
    >
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.span
            className={motionSpanClass}
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.15 }
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 }
            }}
          />
        )}
      </AnimatePresence>
      <Card title={post.title} description={post.description} />
    </Link>
  );
};

const Posts = ({ posts }: PostsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 py-10">
      {posts.map((post: Post, index: number) => {
        return (
          <PostItem
            key={index}
            post={post}
            index={index}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        );
      })}
    </div>
  );
};

export default Posts;
