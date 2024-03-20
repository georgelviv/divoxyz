import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="mb-5">
      <Link to={'/'}>
        <motion.h3
          initial={{ y: -50, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="text-center text-5xl text-primary"
        >
          DYVO.XYZ
        </motion.h3>
      </Link>
    </header>
  );
};

Header.displayName = 'Header';

export default Header;
