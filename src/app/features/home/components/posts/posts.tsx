import { Card } from '../card';

interface PostsProps {
  posts: string[];
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <div>
      {posts.map((post, index: number) => {
        return <Card key={index} title={post} />;
      })}
    </div>
  );
};

export default Posts;
