// import React from 'react';
// import { Link } from 'react-router-dom';
// import LoggedOutHomePage from './out_homepage';
// import LoggedInHomePage from './in_homepage';
// import { GrLogout } from 'react-icons/gr';

// const Homepage = ({ currentUser, logoutUser }) => {
//   const loggedOut = () => (
//     <LoggedOutHomePage/>
//   );
  
//   const loggedIn = () => (
//     <LoggedInHomePage/>
//   );

//   return currentUser ? loggedIn() : loggedOut();
// };


// export default Homepage;



// // <nav className="logout">
// //       <div className='nav-left'>
// //         <Link to="/dashboard" className="header-link">
// //           <img src={window.photos.black_logo} alt="Mint Logo"/>
// //         </Link>
// //       </div>
// //       <div className='nav-right'>
// //         <button onClick={logoutUser}> <GrLogout/> LOG OUT</button>
// //       </div>
// //     </nav>