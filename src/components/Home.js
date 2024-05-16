import React from 'react';
import Sidebar from './Sidebar';

const Home = () => {
    return (
        <div>
            <div>
                <Sidebar></Sidebar>
            </div>
            {/* <div>
                <img src={process.env.PUBLIC_URL + '/classroom.jpg'} alt="Description of the image"
                 style={{width: '100vw', height: '100vh', objectFit: 'cover'}} />     
            </div> */}
        </div>
    );
};

export default Home;