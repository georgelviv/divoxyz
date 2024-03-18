import { Posts } from './components/posts';
import posts from '@posts/posts.json';

const Home = () => {
  return (
    <div>
      <Posts posts={posts} />
    </div>
  );
};

export default Home;
