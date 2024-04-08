import { Outlet } from 'react-router-dom';
import { Header } from '@core/components/header';
import './styles/main.scss';
import { Footer } from '@core/components/footer';

const App = () => {
  return (
    <main className="bg-background min-h-full lg:h-full lg:overflow-auto">
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
