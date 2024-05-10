import { Film } from 'lucide-react';
import { useEffect, useState } from 'react';

const FPSWidget = () => {
  const [fps, setFSP] = useState<number>(0);

  useEffect(() => {
    let animationIndex: number;
    let frameCount = 0;

    const check = () => {
      animationIndex = requestAnimationFrame(() => {
        frameCount++;
        check();
      });
    };
    check();

    const intervalId: number = setInterval(() => {
      setFSP(frameCount);
      frameCount = 0;
    }, 1000) as unknown as number;

    return () => {
      clearInterval(intervalId);
      cancelAnimationFrame(animationIndex);
    };
  }, []);

  return (
    <div className="px-1 py-2 text-primary flex gap-2">
      <Film /> <span className="w-4">{fps}</span> FPS
    </div>
  );
};

FPSWidget.displayName = 'FPSWidget';

export default FPSWidget;
