import { Posts } from './components/posts';

const posts: string[] = ['First', 'Second', 'Three', 'Four', 'Five', 'Six'];

const Home = () => {
  return (
    <div>
      <Posts posts={posts} />
    </div>
  );
};

export default Home;
