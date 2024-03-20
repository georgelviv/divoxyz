import classNames from 'classnames';
import { motion } from 'framer-motion';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'button'> {
  children: JSX.Element | string;
  scaleAnimation?: boolean;
}

const Button = ({ children, scaleAnimation, ...rest }: Props) => {
  const cssClasses = classNames(
    'rounded-md border border-primary text-sm',
    'text-primary font-medium px-4 py-2 hover:cursor-pointer'
  );

  const buttonEl = (
    <button className={cssClasses} {...rest}>
      {children}
    </button>
  );

  if (scaleAnimation) {
    return (
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, repeatDelay: 1 }}
      >
        {buttonEl}
      </motion.div>
    );
  } else {
    return buttonEl;
  }
};

Button.displayName = 'Button';

export default Button;
