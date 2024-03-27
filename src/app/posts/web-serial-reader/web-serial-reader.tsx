import Demo from './demo';
import article from './article.md?raw';
import { useLoaderData } from 'react-router-dom';
import { Post } from '@core/models/core.models';
import PostLayout from '@core/components/post-layout/post-layout';

const WebSerial = () => {
  const post: Post = useLoaderData() as Post;
  return <PostLayout post={post} article={article} demo={<Demo />} />;
};

WebSerial.displayName = 'WebSerial';

export default WebSerial;
