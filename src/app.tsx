import { Outlet } from 'react-router-dom';
import { Header } from '@core/components/header';
import './styles/main.scss';

const App = () => {
  return (
    <main className="bg-slate-100 h-full p-5">
      <Header />
      <Outlet />
    </main>
  );
};

App.displayName = 'App';

export default App;
