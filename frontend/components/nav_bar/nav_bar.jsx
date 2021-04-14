import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.page = this.props.page
    }

    render() {
        let overviewClass = (this.props.page === 'Overview' ? 'selected' : 'unselected');
        let transactionsClass = (this.props.page === 'Transactions' ? 'selected' : 'unselected');
        let investmentsClass = (this.props.page === 'Investments' ? 'selected' : 'unselected');


        return(
            <section className='nav-bar'>
                <button className={`nav-button ${overviewClass}`}>
                    <Link to="/dashboard" className="nav-links">
                        <div className='nav-link-text'> OVERVIEW </div> 
                    </Link>
                </button>  
                <button className={`nav-button ${transactionsClass}`}>
                    <Link to="/transactions" className="nav-links">
                        <div className='nav-link-text'> TRANSACTIONS </div> 
                    </Link>
                </button>  
                <button className={`nav-button ${investmentsClass}`}>
                    <Link to="/investments" className="nav-links">
                        <div className='nav-link-text'> INVESTMENTS </div> 
                    </Link>
                </button>  
            </section>
        )
    }
}

export default NavBar;