import { useState } from 'react';
import { Card } from '../card';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

interface PostsProps {
  posts: string[];
}

const Posts = ({ posts }: PostsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getPost = (post: string, index: number) => {
    const motionSpanClass = classNames(
      'absolute inset-0 h-full w-full',
      'bg-neutral-200 dark:bg-slate-300/[0.8] block rounded-3xl'
    );

    const wrapperClass = classNames(
      'relative group block p-2 h-full w-full hover:cursor-pointer'
    );

    return (
      <div
        key={index}
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
        <Card title={post} />
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 py-10">
      {posts.map((post: string, index: number) => {
        return getPost(post, index);
      })}
    </div>
  );
};

export default Posts;
