import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NewPerson from './Person/NewPerson'
import registerServiceWorker from './registerServiceWorker';
import ToggleListPersons from "./Person/ToggleListPersons";

ReactDOM.render(<ToggleListPersons />, document.getElementById('root'));
registerServiceWorker();
