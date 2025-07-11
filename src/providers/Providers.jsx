import { Provider } from 'react-redux';
import { store } from '../redux/config/ConfigStore';

function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;
