import { OlympicProvider } from '../context/Context';

function Providers({ children }) {
  return <OlympicProvider>{children}</OlympicProvider>;
}

export default Providers;
