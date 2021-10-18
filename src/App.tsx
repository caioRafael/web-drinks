import './styles/global.scss'
import Home from './pages/Home';
import { DrinksProvider } from './contexts/DrinksContexts';

function App() {
  return (
    <DrinksProvider>
      <Home />
    </DrinksProvider>
  );
}

export default App;
