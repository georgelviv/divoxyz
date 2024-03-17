import { Posts } from './components/posts';

const posts: string[] = ['First', 'Second'];

const Home = () => {
  return (
    <div>
      <Posts posts={posts} />
    </div>
  );
};

export default Home;
