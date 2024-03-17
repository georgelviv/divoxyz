import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="mb-5">
      <motion.h1
        initial={{ y: -50, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="text-center text-5xl"
      >
        DYVO.XYZ
      </motion.h1>
    </header>
  );
};

export default Header;
