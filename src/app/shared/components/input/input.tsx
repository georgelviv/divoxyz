import classNames from 'classnames';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'input'> {}

const inputClasses = classNames(
  'rounded-md border border-primary text-primary px-4 py-2',
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary'
);

const Input = ({ ...rest }: Props) => {
  return (
    <div>
      <input type="text" className={inputClasses} {...rest} />
    </div>
  );
};

Input.displayName = 'Input';

export default Input;
