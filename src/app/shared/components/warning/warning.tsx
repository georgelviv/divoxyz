import classNames from 'classnames';
import { TriangleAlert } from 'lucide-react';

interface WarningProps {
  children?: JSX.Element | string | string[];
}

const Warning = ({ children }: WarningProps) => {
  const css = classNames(
    'flex gap-2 bg-background p-2 rounded-md text-primary border border-primary'
  );

  return (
    <div className={css}>
      <TriangleAlert /> {children}
    </div>
  );
};

Warning.displayName = 'Warning';

export default Warning;
