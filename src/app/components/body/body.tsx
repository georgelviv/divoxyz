import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '@features/home';

const Body = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<div>About</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default Body;
