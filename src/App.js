import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route} 
from 'react-router-dom';
import CreateBoard from './components/CreateBoard/CreateBoard';
import Home from './components/Home/Home';
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <Router>
      <NavBar/>
       <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/CreateBoard" component={CreateBoard}/>
          <Route path="/:id" component={Main} />                                                             
        </Switch>
       </div>
    </Router>

  );
}

export default App;
