import { Post } from '@core/components/post';

const WavePattern = () => {
  const article = <div>Wave pattern article</div>;

  const demo = <div>Wave pattern demo</div>;
  return <Post article={article} demo={demo} />;
};

WavePattern.displayName = 'WavePattern';

export default WavePattern;
