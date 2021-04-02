
import React, { useContext } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import AvatarFace from '../../icons/Avatar face.png'
import { handleSignOut } from '../Login/LoginManager';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const location = window.location;
    const showUserInfo = () => {
        
        const userInfo = document.getElementById('loggedIn-user-info');

        if (userInfo.classList) { 
            userInfo.classList.toggle("display-none");
          } else {
            var classes = userInfo.className.split(" ");
            var i = classes.indexOf("display-none");
        
            if (i >= 0) 
              classes.splice(i, 1);
            else 
              classes.push("display-none");
              userInfo.className = classes.join(" "); 
          }
    }
    const signOut = () => {
        handleSignOut()
            .then(res => {
                setLoggedInUser(res);
                document.getElementById('loggedIn-user-info').style.display = 'none';
                location.reload();
            })
    }

    return (
        <div className="container  header">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <Link className="navbar-brand brand-logo" to="/">The Daily Shop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orders">Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Deals</Link>
                            </li>
                            <li className="nav-item">
                                {
                                    loggedInUser.name ?
                                        <img onClick={showUserInfo} className="nav-link user-avatar" src={loggedInUser.photo ? loggedInUser.photo : AvatarFace} alt="Avatar" />
                                        :
                                        <Link className="nav-link login-btn btn my-btn" to="/login">Login</Link>
                                }
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

            <div id="loggedIn-user-info" className="loggedIn-user-info display-none">
                <img src={loggedInUser.photo ? loggedInUser.photo : AvatarFace} alt="" />
                <h3>{loggedInUser.name}</h3>
                <p>{loggedInUser.email}</p>
                <button className="btn my-btn" onClick={signOut}>Sign Out</button>
            </div>
        </div>
    );
};

export default Header;