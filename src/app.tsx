import { Outlet } from 'react-router-dom';
import { Header } from '@core/components/header';
import './styles/main.scss';
import { Footer } from '@core/components/footer';
import { useEffect } from 'react';
import { firebaseService } from '@core/services/firebase.service';

const App = () => {
  useEffect(() => {
    firebaseService.init();
  }, []);

  return (
    // h-1 for min-h
    <main className="bg-background min-h-full lg:h-full lg:overflow-auto h-1">
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
