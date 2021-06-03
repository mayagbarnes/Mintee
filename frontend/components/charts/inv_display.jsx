import React, { Component } from 'react'
import InvestmentChart from './inv_chart';
import { Link } from 'react-router-dom';


export default class InvestmentDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            invChart: '',
            timePeriod: 'year'
        }
        this.chartRef = React.createRef();
        this.handleInvestmentClick = this.handleInvestmentClick.bind(this)
        this.handleTimePeriodClick = this.handleTimePeriodClick.bind(this)
    }

   componentDidMount() {
        this.setState( {invChart: this.props.investments[0].ticker})
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
                    this.setState({investment: inv})
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

    makeInvCharts() {
        let chart; 
        this.props.investments.forEach( inv => {
            if(this.state.invChart === inv.ticker) {
                chart = 
                    <div key={inv.id} className='current-chart-div-selected'>
                        <InvestmentChart key={inv.id} investment={inv} timePeriod={this.state.timePeriod}/>
                    </div>
            } 
        })
        return chart;
    }

    render() {
        // let display;
        // if(this.state.loading) {
        //     display =  <div className='loader-container'><div className='loader'></div></div>
        // } else {
        //     display = <div className='hidden'></div>
        // }

        let chartTitle;
        if(this.state.timePeriod === 'year'){
            chartTitle = 'Stock Price - Last 12 Months'
        } else if (this.state.timePeriod === '6 month') {
            chartTitle = 'Stock Price - Last 6 Months'
        } else {
            chartTitle = 'Stock Price - Last Quarter'
        }

        let investmentCharts;
        let investmentButtons;
        if(this.props.investments.length > 0) {
            investmentCharts = this.makeInvCharts();
            investmentButtons = this.makeButtons();
        }

        return (
            // <div className='current-chart-div-selected'>
            //         <h3>Time Periods:</h3>
            //         <div className='view-button-container'>
            //             <button className='view-button' value="quarter" onClick={this.handleTimePeriodClick}>
            //             3 Months
            //             </button>
            //             <button className='view-button' value="6 month" onClick={this.handleTimePeriodClick}>
            //             6 Months
            //             </button>
            //             <button className='view-button' value="year" onClick={this.handleTimePeriodClick}>
            //             12 Months
            //             </button>
            //         </div>
            //     {/* <h2>{chartTitle}</h2> */}
            //     <InvestmentChart investment={inv} timePeriod={this.state.timePeriod}/>
            // </div>


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
