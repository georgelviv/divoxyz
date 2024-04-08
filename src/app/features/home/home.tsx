import { useSearchParams } from 'react-router-dom';
import { Posts } from './components/posts';
import posts from '@posts/posts.json';
import { Post } from '@core/models/core.models';
import { Button } from '@shared/components/button';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let filteredPosts: Post[] = posts.filter((p) => {
    return !p.hidden;
  });
  const qParam: string = searchParams.get('q');

  if (qParam) {
    filteredPosts = posts.filter((post: Post) => {
      return post.tags.includes(qParam);
    });
  }

  const clearTag = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div>
      {qParam && (
        <div className="flex justify-center items-center text-primary">
          <div className="text-lg">#{qParam}</div>
          <Button onClick={clearTag} theme="text" icon="x" />
        </div>
      )}
      <Posts posts={filteredPosts} />
    </div>
  );
};

Home.displayName = 'Home';

export default Home;
