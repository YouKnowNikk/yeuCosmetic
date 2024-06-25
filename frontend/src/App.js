
import './App.scss';

import { BrowserRouter } from 'react-router-dom';
import PortalConfig from './Components/routing/PortalConfig';

function App() {
  return (
    <>
    <BrowserRouter>
    <PortalConfig />
    </BrowserRouter>
    
    </>
  );
}

export default App;
