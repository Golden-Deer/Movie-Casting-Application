import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './auth/PrivateRoute';
import { AuthProvider } from './auth/Auth';
import Home from './routes/Home';
import passwordRecovery from './routes/passwordRecoveryPopup';
import Discover from './routes/discover/Discover';
import Search from './routes/search/Search';
import Navbar from './routes/layout/Navbar';
import ProjectViewer from './routes/project/ProjectViewer';
import RolePage from './routes/project/RolePage';
import About from './routes/About';
import ActorProfile from './routes/ActorProfile';

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
          <Route exact path='/project' component={ProjectViewer} />
          <Route exact path='/rolepage' component={RolePage} />
          <Route exact path='/about' component={About} />
          <Route exact path='/actor' component={ActorProfile} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
