import { Navigate, Route, Routes } from 'react-router-dom';
import { Post } from '@features/post';
import { Home } from '@features/home';

const Body = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

Body.displayName = 'Body';

export default Body;
