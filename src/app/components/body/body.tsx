import { Route, Routes } from 'react-router-dom';
import { Home } from '@features/home';

const Body = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
    </div>
  );
};

export default Body;
