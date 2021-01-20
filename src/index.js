import React from 'react';
import ReactDom from 'react-dom';
import StartPage from "./pages/start-page";

import * as serviceWorker from './serviceWorker';

ReactDom.render(<StartPage />,
  document.getElementById('root'));

serviceWorker.unregister();