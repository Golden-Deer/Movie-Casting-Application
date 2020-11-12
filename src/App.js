import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/Auth";
import Home from "./routes/Home";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Discover from "./routes/discover/Discover"
import Search from "./routes/search/Search"

function App() {
  return (
    <AuthProvider>
        <Router>
            <div>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/discover" component={Discover} />
            </div>
        </Router>
      </AuthProvider>
  );
}

export default App;