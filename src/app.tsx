import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@core/components/header';
import './styles/main.scss';
import { Footer } from '@core/components/footer';
import { useEffect, useRef } from 'react';
import { firebaseService } from '@core/services/firebase.service';

const App = () => {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    firebaseService.init();
  }, []);

  useEffect(() => {
    mainRef.current.scrollTo(0, 0);
  }, [pathname]);

  return (
    // h-1 for min-h
    <main
      className="bg-background min-h-full h-full overflow-auto"
      ref={mainRef}
    >
      <div className="p-5 min-h-[calc(100%-64px)]">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

App.displayName = 'App';

export default App;
