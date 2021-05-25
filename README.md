   <img src="https://github.com/mayagbarnes/Mintee/blob/main/app/assets/images/logo.png" width="260" height="85">

# Mintee

[Mintee](https://mintee.herokuapp.com/#/) is inspired by [Mint](https://mint.intuit.com/), Intuit's personal financial management platform. This app implements many of the same features, allowing users to manage their accounts, track spending, and monitor investments. 

## Technologies & Hosting

Mintee is hosted on Heroku and incorporates the following technologies:
* Ruby on Rails
* React
* Redux
* PostgreSQL
* Webpack
* Babel

## Features

* **Investments**
  * Investment prices updated daily for each Investment - Finnhub API
  * Dynamic ticker suggestions to assist with investment creation
  * Create, Update, and Delete investments - updates associated account balance
  * Search by name/ticker & Sort by table column (Ascending/Descending)
  <p align="left">
  <img width="500" alt="Investment Table" src="https://user-images.githubusercontent.com/63436329/119446565-80d56980-bce3-11eb-9be7-d28890a1d893.png">
  </p>
    <!-- <p align="right">
  <img width="250" alt="Investment Addition" src="https://user-images.githubusercontent.com/63436329/119446562-7f0ba600-bce3-11eb-869f-317a14ee01bb.png">
  </p> -->
* **Transactions View**
  * Create, Update, and Delete Transactions - updates associated account balance
  * Search by description/category & Sort by table column (Ascending/Descending)
  * Pagination of transactions list
  <p align="center">
  <img width="650" alt="Transactions" src="https://user-images.githubusercontent.com/63436329/118378560-89160200-b589-11eb-8270-d8740f46a49d.gif">
  </p>
* **Dashboard View**
  * View, Create, Update, and Delete Accounts
  * Chart.js: Current Month Income vs. Spending & Trailing 3 Month Spending Trend
  <p align="center">
    <img width="650" alt="Current Month Chart" src="https://user-images.githubusercontent.com/63436329/118377787-561d3f80-b584-11eb-9266-a7a82e31a89f.gif">
  </p>
* **Sign Up / Login**
  * User authentication and authorization leveraging BCrypt to hash user passwords 