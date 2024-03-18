import { Body } from '@core/components/body';
import { Header } from '@core/components/header';
import './styles/main.scss';

const App = () => {
  return (
    <main className="bg-slate-100 h-full p-5">
      <Header />
      <Body />
    </main>
  );
};

export default App;
