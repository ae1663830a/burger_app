import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import OldApp from './old/OldApp';
import NewPerson from './old/NewPerson'
import registerServiceWorker from './registerServiceWorker';
import ToggleListPersons from "./old/ToggleListPersons";
import App from "./App";

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
