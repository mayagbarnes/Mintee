import * as StockAPIUtil from "../util/stock_api_util";
export const RECEIVE_STOCKS = "RECEIVE_STOCKS";


const receiveStocks = (stocks) => ({
  type: RECEIVE_STOCKS,
  stocks,
});

export const fetchStocks = (signal) => (dispatch) =>
  StockAPIUtil.indexStocks(signal).then((stocks) =>
    dispatch(receiveStocks(stocks))
  );