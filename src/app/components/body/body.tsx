import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '@features/home';
import { Post } from '@features/post';

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

export default Body;
