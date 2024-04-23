import classNames from 'classnames';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'input'> {
  label?: string;
  placeholder?: string;
  id: string;
  extraClasses?: string;
  hasError?: boolean;
}

const Input = ({
  label,
  id,
  placeholder,
  extraClasses,
  hasError,
  children,
  ...rest
}: Props) => {
  const inputClasses = classNames(
    'rounded-md border px-4 py-2',
    'focus-visible:outline-none focus-visible:ring-1',
    { 'border-error text-error focus-visible:ring-error': hasError },
    { 'border-primary text-primary focus-visible:ring-secondary': !hasError }
  );

  const labelClasses = classNames(
    'text-sm',
    { 'text-error': hasError },
    { 'text-secondary': !hasError }
  );

  const hintClasses = classNames(
    'text-xs mt-1',
    { 'text-error': hasError },
    { 'text-secondary': !hasError }
  );

  const childrenContent = children ?? '';

  return (
    <div className={classNames('flex flex-col', extraClasses)}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
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
      {childrenContent && <div className={hintClasses}>{childrenContent}</div>}
    </div>
  );
};

Input.displayName = 'Input';

export default Input;
