import React from 'react';
import './Admin.css'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';


const Admin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8085/api/auth/login", {
                username: username,
                password: password
            }).then((res) => {
                // console.log(res.data);
                localStorage.setItem('token', res.data.token);
                navigate('/');
                // if (res.data.message === "OK") {
                //     navigate('/'); //where?
                // }
                // else {
                //     alert("Username or password doesn't match");
                // }
            }, fail => {
                console.error(fail);
            });
        }


        catch (err) {
            alert(err);
        }

    }

    return (
        <div>
            <div>
                <Sidebar></Sidebar>
            </div>
            <div className='AdminBG'>

                <div className='Admin'>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username"
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}></input>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}></input>
                    <button className='Admin-button' type='submit' onClick={login}> Login </button>
                </div>
            </div>
        </div>
    );
};

export default Admin;
