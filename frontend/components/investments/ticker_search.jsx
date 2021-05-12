import React from "react";
import { Link } from "react-router-dom";


class SearchMatches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: this.props.stocks,
            filterTerm: this.props.filterTerm,
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {
        this.setState({filterTerm: e.currentTarget.value})
    }

    render() {
        let matchingStocks = [];
        if(this.state.filterTerm !== '') {
            matchingStocks = this.props.stocks.filter( (stock) => {
                return (
                    stock.name.toLowerCase().indexOf(this.state.filterTerm.toLowerCase()) !== -1 ||
                    stock.ticker.toLowerCase().indexOf(this.state.filterTerm.toLowerCase()) !== -1
                )
            })
        } 

        let matches;
        let hidden = '';
        if(matchingStocks.length > 5) {
            matches = [];
            for(let i = 0; i < 5; i++) {
                let company = matchingStocks[i].name.split(' ').map( (word) => {
                    return word[0].toUpperCase() + word.slice(1).toLowerCase()
                }).join(' ')
                let tableRow = <tr key={matchingStocks[i].id} className="search-result-item">
                                    <td className="search-list-symbol">
                                        {matchingStocks[i].ticker}
                                    </td>
                                    <td className="search-list-description">
                                        {company}
                                    </td>
                                </tr>
                matches.push(tableRow)
            }
        } else if(matchingStocks.length === 0 && this.state.filterTerm !== '') {
             matches = <tr className="search-list-item">
                            <td colSpan='2' className="search-list-description">
                                No matching tickers
                            </td>
                        </tr>   
        } else if(matchingStocks.length === 0 && this.state.filterTerm === '') {
             matches = <tr className="hidden">
                            <td colSpan='2' className="search-list-description">
                            </td>
                        </tr>   
            hidden = 'hidden'
        }else {
            matches = matchingStocks.map((stock) => {
                let company = stock.name.split(' ').map( (word) => {
                    return word[0].toUpperCase() + word.slice(1).toLowerCase()
                }).join(' ')

                return (<tr key={stock.id} className="search-result-item">
                    <td className="search-list-symbol">
                        {stock.ticker}
                    </td>
                    <td className="search-list-description">
                        {company}
                    </td>
                </tr>)
            })
        }

        return (
            <div>
                <div className="search-input-holder">
                <input id='investment-ticker' 
                    type="text" 
                    placeholder='Search Company Name or Ticker'
                    value={this.state.filterTerm}
                    onChange={this.handleSearch}
                />
                </div>
                <table className={`search-result-table ${hidden}`}>
                    <tbody className="result-list">
                        {matches}
                    </tbody>
                </table>
            </div>
        )
    }


}

export default SearchMatches;