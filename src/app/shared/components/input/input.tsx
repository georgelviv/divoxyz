import classNames from 'classnames';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'input'> {
  label?: string;
  placeholder?: string;
  id: string;
  extraClasses?: string;
}

const Input = ({ label, id, placeholder, extraClasses, ...rest }: Props) => {
  const inputClasses = classNames(
    'rounded-md border border-primary text-primary px-4 py-2',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary'
  );

  return (
    <div className={classNames('flex flex-col', extraClasses)}>
      {label && (
        <label htmlFor={id} className="text-sm text-secondary">
          {label}
        </label>
      )}
      <input
        type="text"
        className={inputClasses}
        id={id}
        placeholder={label || placeholder}
        {...rest}
      />
    </div>
  );
};

Input.displayName = 'Input';

export default Input;
