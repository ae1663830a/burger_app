import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NewPerson from './Person/NewPerson'
import registerServiceWorker from './registerServiceWorker';
import ToggleListPersons from "./Person/ToggleListPersons";
import PersonsListArray from "./Person/PersonsListArray";

ReactDOM.render(<PersonsListArray />, document.getElementById('root'));
registerServiceWorker();
