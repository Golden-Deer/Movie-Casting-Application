import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './auth/PrivateRoute';
import { AuthProvider } from './auth/Auth';
import Home from './routes/Home';
import passwordRecovery from './routes/passwordRecoveryPopup';
import Discover from './routes/discover/Discover';
import Search from './routes/search/Search';
import Navbar from './routes/layout/Navbar';
import Project from './routes/project/Project';
import RolePage from './routes/project/RolePage';
import About from './routes/About';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route exact path='/passwordrecovery' component={passwordRecovery} />
          <Route exact path='/search' component={Search} />
          <Route exact path='/discover' component={Discover} />
          <Route exact path='/project' component = {Project} />
          <Route exact path='/rolepage' component = {RolePage} />
          <Route exact path='/about' component={About}/>

        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
