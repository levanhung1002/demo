import React, {useState} from "react";
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./views/Home";
import Posts from "./views/posts/Posts";
import Profile from "./views/Profile";
import Login from "./views/Login";
import Nav from "./Nav";
import Post from "./views/posts/Post";


const initialCurrentUser = {
    userId: null,
    token: null
}


function App() {
    const [currentUser, setCurrentUser] = useState(initialCurrentUser);
    const loginSuccess = ({userId, token}) => setCurrentUser({userId, token});
    const logout = () => setCurrentUser(initialCurrentUser);
    const isUserLoggedIn = Boolean(currentUser.userId);
    return (
        <Router>
            <div>

                <Nav logout = { logout }
                     isUserLoggedIn = { isUserLoggedIn } />


                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/posts" exact component={Posts}/>
                    <Route path="/profile" exact>
                        {!isUserLoggedIn ?
                            (<Login
                                title="You need to login to continue"
                                loginSuccess={loginSuccess}/>)
                            : (<Profile
                                currentUser={currentUser}
                            />)
                        }
                    </Route>
                    <Route path="/login" exact component={Login}>
                        <Login
                            loginSuccess={loginSuccess}
                        />
                    </Route>
                    <Route path={`/posts/:postId`} exact component={Post}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
