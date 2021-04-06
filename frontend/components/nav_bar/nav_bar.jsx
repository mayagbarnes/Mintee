import React from 'react';

class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <section className='nav-bar'>
                <button onClick={this.props.logoutUser}>Logout</button>
            </section>
        )
    }
}

export default NavBar;