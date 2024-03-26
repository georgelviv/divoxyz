import { Outlet } from 'react-router-dom';
import { Header } from '@core/components/header';
import './styles/main.scss';

const App = () => {
  return (
    <main className="bg-background min-h-full lg:h-full lg:overflow-auto p-5">
      <Header />
      <Outlet />
    </main>
  );
};

App.displayName = 'App';

export default App;
