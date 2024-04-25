import classNames from 'classnames';
import { TriangleAlert } from 'lucide-react';

interface Props {
  center?: boolean;
  children?: JSX.Element | string | string[];
}

const Warning = ({ center, children }: Props) => {
  const css = classNames(
    'flex gap-2 bg-background p-2 rounded-md text-primary border border-primary'
  );

  const content = (
    <div className={css}>
      <TriangleAlert /> {children}
    </div>
  );

  if (center) {
    return (
      <div className="w-full h-full flex relative ">
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          {content}
        </div>
      </div>
    );
  } else {
    return content;
  }
};

Warning.displayName = 'Warning';

export default Warning;
