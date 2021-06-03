import React from 'react';
import {Link} from 'react-router-dom';
import InvestmentChart from "../charts/inv_chart";

class DashInvestments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invChart: '',
            timePeriod: 'year',
        }
        this.handleInvestmentClick = this.handleInvestmentClick.bind(this)
        this.handleTimePeriodClick = this.handleTimePeriodClick.bind(this)
    }

    componentDidMount() {
        this.props.fetchInvestments()
            .then( () => this.setState( {invChart: this.props.investments[0].ticker}))
    }

    // handle which investment chart to render
    handleInvestmentClick(e) {
        e.preventDefault();
        this.setState({invChart: e.currentTarget.value})
    }

    // handle which time period to render
    handleTimePeriodClick(e) {
        e.preventDefault();
        this.setState({timePeriod: e.currentTarget.value})
    }

    makeButtons() {
        return this.props.investments.map( inv => {
                if(this.state.invChart === inv.ticker) {
                    return (
                        <button className='chart-select-button-selected' 
                                value={`${inv.ticker}`} 
                                key={inv.id}
                                onClick={this.handleInvestmentClick}>
                            {inv.ticker}
                        </button>
                    )
                } else {
                    return (
                         <button className='chart-select-button-unselected' 
                                value={`${inv.ticker}`} 
                                key={inv.id}
                                onClick={this.handleInvestmentClick}>
                            {inv.ticker}
                        </button>
                    )
                }
        })
        
    }

    makeInvChart() {
        let yearClass = this.state.timePeriod === 'year' ? 'selected' : 'unselected';
        let halfYearClass = this.state.timePeriod === '6 month' ? 'selected' : 'unselected';
        let quarterClass = this.state.timePeriod === 'quarter' ? 'selected' : 'unselected';

        let charts = []; 
        let timePeriods = <div className='time-period-button-container'>
                                <h3 className='time-period-header'>Time Period:</h3>
                                <button className={`time-period-button-${quarterClass}`} value="quarter" onClick={this.handleTimePeriodClick}>
                                3 Months
                                </button>
                                <button className={`time-period-button-${halfYearClass}`} value="6 month" onClick={this.handleTimePeriodClick}>
                                6 Months
                                </button>
                                <button className={`time-period-button-${yearClass}`} value="year" onClick={this.handleTimePeriodClick}>
                                12 Months
                                </button>
                            </div>
        this.props.investments.forEach( inv => {
            if(this.state.invChart === inv.ticker) {
                    charts.push(
                        <div key={`${inv.id}-1`} className={`current-chart-div-${yearClass}`}>
                            <InvestmentChart key={`${inv.id}-1`} investment={inv} timePeriod='year'/>
                            {timePeriods}
                        </div>,
                        <div key={`${inv.id}-2`} className={`current-chart-div-${halfYearClass}`}>
                            <InvestmentChart key={`${inv.id}-2`} investment={inv} timePeriod='6 month'/>
                            {timePeriods}
                        </div>,
                         <div key={`${inv.id}-3`} className={`current-chart-div-${quarterClass}`}>
                            <InvestmentChart key={`${inv.id}-3`} investment={inv} timePeriod='quarter'/>
                            {timePeriods}
                        </div>
                    )
            } 
        })
        return charts;
    }


    render() {
        let investmentButtons;
        let investmentCharts;
        if(this.props.investments.length > 0) {
            investmentButtons = this.makeButtons();
            investmentCharts = this.makeInvChart();
        }
        
        return(   
            <div className='dashboard'>
                <header className='dash-trans-heading'>
                    <h2>INVESTMENT TRENDS</h2>
                    <div className='view-button-container'>
                        <button className='view-button'>
                        <Link to="/investments">
                            <p className='icon'></p>
                            <div className='button-text'>View Investments</div>
                        </Link>
                        </button>
                    </div>
                </header>
                <div className='chart-select-container'>
                    {investmentButtons}
                </div>
                    {investmentCharts}
            </div>
        )
    }

}

export default DashInvestments;
