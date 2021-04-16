import React from 'react';
import {MdDeleteForever} from 'react-icons/md';
import {GrEdit} from 'react-icons/gr';

class InvestmentItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        if(!this.props.investment.price) {
            let apikey = window.finnhubAPIKey;
            let ticker = this.props.investment.ticker
        
                fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apikey}`)
                    .then(response => (response.json()))
                    .then(quote => this.addCurrentPrice(quote["c"]))
        }
    }

    componentDidMount() {
        let apikey = window.finnhubAPIKey;
        let ticker = this.props.investment.ticker
    
        fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apikey}`)
            .then(response => (response.json()))
            .then(quote => {this.addCurrentPrice(quote["c"])})
    }

    addCurrentPrice(price) {
        let current_price = `${price}`
        let total = parseInt(this.props.investment.shares) * price
        let investment = {...this.props.investment, price: current_price, market_value: total}
        this.props.receiveInvestment(investment)
    }

    render() {
        var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });
        let cost = parseFloat(this.props.investment.price_paid);
            cost.toFixed(2);
            cost = formatter.format(cost)
        let price = parseFloat(this.props.investment.price);
            price.toFixed(2);
            price = formatter.format(price)
        let market_value = parseInt(this.props.investment.shares) * parseInt(this.props.investment.price)
            market_value.toFixed(2);
            market_value = formatter.format(market_value)

        return (
            <tr className='investment-info'>
                <td className='investment-name'>{this.props.investment.inv_name}</td>
                <td className='investment-ticker'>{this.props.investment.ticker}</td>
                <td className='investment-price'>{price}</td>
                <td className='investment-cost'>{cost}</td>
                <td className='investment-shares'>{this.props.investment.shares}</td>
                <td className='investment-mkt_value'>{market_value}</td>
                <td className='investment-change-buttons'>
                    <button className='investment-update' onClick={ () => {this.props.openModal('EditInv', this.props.investment)}}> < GrEdit /> </button>
                    <button className='investment-delete' onClick={ () => {this.props.openModal('RemoveInv', this.props.investment)}}><MdDeleteForever /></button>
                </td>
            </tr>
        )
    }
}

export default InvestmentItem;