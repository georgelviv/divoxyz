import { Body } from './app/components/body';
import { Header } from './app/components/header';
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
