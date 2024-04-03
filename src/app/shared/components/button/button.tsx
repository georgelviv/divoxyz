import classNames from 'classnames';
import { motion } from 'framer-motion';
import { ComponentProps } from 'react';
import { ButtonIcon, ButtonTheme } from './button.models';
import { Expand, Minimize, Usb, X } from 'lucide-react';

interface Props extends ComponentProps<'button'> {
  children?: JSX.Element | string | string[];
  scaleAnimation?: boolean;
  icon?: ButtonIcon;
  theme?: ButtonTheme;
  extraClasses?: string;
}

const Button = ({
  children,
  theme,
  scaleAnimation,
  icon,
  extraClasses,
  ...rest
}: Props) => {
  let cssClasses = classNames(
    'rounded-md border border-primary text-sm bg-background',
    'text-primary font-medium px-4 py-2 hover:cursor-pointer',
    'flex justify-center items-center gap-2'
  );

  if (theme) {
    if (theme === 'text') {
      cssClasses = classNames(cssClasses, 'border-0 bg-transparent px-1');
    }
  }

  let iconContent: JSX.Element | string = '';

  if (icon) {
    if (icon === 'expand') {
      iconContent = <Expand />;
    } else if (icon === 'minimize') {
      iconContent = <Minimize />;
    } else if (icon === 'x') {
      iconContent = <X />;
    } else if (icon === 'usb') {
      iconContent = <Usb />;
    }
  }

  const childrenContent = children ?? '';

  const buttonEl = (
    <button
      type="button"
      className={classNames(cssClasses, extraClasses)}
      {...rest}
    >
      {iconContent}
      {childrenContent}
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
