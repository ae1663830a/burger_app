import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import OldApp from './components/old/OldApp';
import NewPerson from './components/old/NewPerson'
import registerServiceWorker from './registerServiceWorker';
import ToggleListPersons from "./components/old/ToggleListPersons";
import App from "./containers/App";

ReactDOM.render(<App title="AAAA" />, document.getElementById('root'));
registerServiceWorker();
