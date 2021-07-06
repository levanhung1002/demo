import {
    Link
} from "react-router-dom";
import React from "react";
import axios from "axios";

function Nav(props) {
    const { isUserLoggedIn, logout } = props;
    return (
        <nav>
            <div class="topnav">

                <Link to="/">Home</Link>

                <Link to="/posts">Posts</Link>

                <Link to="/profile">Profile</Link>

                {!isUserLoggedIn && (<Link to="/login">Login</Link>)}

                { isUserLoggedIn &&(
                    <button
                        className="top-nav--link"
                        onClick={ () => {
                            logout();
                            axios.defaults.headers.common['Authorization'] = '';
                        } }>
                        Logout
                    </button>
                ) }

            </div>


        </nav>
    );
}

export default Nav;