import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {AuthProvider} from './auth/Auth';
import Home from './view/Home';
import passwordRecovery from './view/account/PasswordRecoveryPopup';
import Discover from './view/discover/Discover';
import Search from './view/search/Search';
import Navbar from './view/layout/Navbar';
import ProjectViewer from './view/project/ProjectViewer';
import About from './view/About';
import ActorProfile from './view/actor/ActorProfile';
import RoleViewer from './view/role/RoleViewer';
import CacheRoute from 'react-router-cache-route';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Navbar/>
                    <Route exact path='/passwordrecovery' component={passwordRecovery}/>
                    <Route exact path='/search' component={Search}/>
                    <CacheRoute exact path='/discover' component={Discover}/>
                    <Route exact path='/project' component={ProjectViewer}/>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/dashboard' component={Home}/>
                    <Route exact path='/rolepage' component={RoleViewer}/>
                    <Route exact path='/about' component={About}/>
                    <Route exact path='/actor' component={ActorProfile}/>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
