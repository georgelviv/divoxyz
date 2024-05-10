import classNames from 'classnames';
import { motion } from 'framer-motion';
import { ComponentProps } from 'react';
import { ButtonIcon, ButtonTheme } from './button.models';
import {
  ArrowDownToLine,
  Expand,
  Github,
  Minimize,
  Usb,
  X
} from 'lucide-react';

interface BaseProps {
  scaleAnimation?: boolean;
  icon?: ButtonIcon;
  theme?: ButtonTheme;
  extraClasses?: string;
  link?: string;
}

interface ButtonProps extends ComponentProps<'button'>, BaseProps {}
interface LinkProps extends ComponentProps<'a'>, BaseProps {}

const Button = ({
  children,
  theme,
  scaleAnimation,
  icon,
  extraClasses,
  link,
  ...rest
}: ButtonProps | LinkProps) => {
  let cssClasses = classNames(
    'rounded-md border border-primary bg-background',
    'text-primary font-medium hover:cursor-pointer',
    {
      'px-4 py-2': !theme || theme === 'normal'
    },
    'flex justify-center items-center gap-2 hover:bg-background-hover transition'
  );

  if (theme) {
    if (theme === 'text') {
      cssClasses = classNames(cssClasses, 'border-0 bg-transparent px-1');
    } else if (theme === 'text-p-0') {
      cssClasses = classNames(cssClasses, 'border-0 bg-transparent px-0 py-0');
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
    } else if (icon === 'github') {
      iconContent = <Github />;
    } else if (icon === 'download') {
      iconContent = <ArrowDownToLine />;
    }
  }

  const childrenContent = children ?? '';
  const parentComponentEl = link ? (
    <a
      href={link}
      target="_blank"
      className={classNames(cssClasses, extraClasses)}
      {...(rest as LinkProps)}
    >
      {iconContent}
      {childrenContent}
    </a>
  ) : (
    <button
      type="button"
      className={classNames(cssClasses, extraClasses)}
      {...(rest as ButtonProps)}
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
        {parentComponentEl}
      </motion.div>
    );
  } else {
    return parentComponentEl;
  }
};

Button.displayName = 'Button';

export default Button;
