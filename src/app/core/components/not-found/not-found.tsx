import { Button } from '@shared/components/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-20 lg:mt-40 flex flex-col gap-8 items-center">
      <h1 className="text-center text-4xl lg:text-6xl text-primary">
        Page Not Found
      </h1>
      <Button onClick={() => navigate('/')} scaleAnimation={true}>
        Go to Home
      </Button>
    </div>
  );
};

NotFound.displayName = 'NotFound';

export default NotFound;
