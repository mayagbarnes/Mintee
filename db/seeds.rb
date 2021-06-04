require 'uri'
require 'net/http'

User.delete_all
Account.delete_all
Transaction.delete_all
Investment.delete_all
Stock.delete_all


demo_login = User.create( {username: 'DemoLogin', password: '123456'})
account_1 = Account.create( { account_name: 'Checking', institution: 'Citi', category: 'Cash', balance: 5500.77, user_id: demo_login.id} )
account_2 = Account.create( { account_name: 'Savings', institution: 'Bank of America', category: 'Cash', balance: 27250.50, user_id: demo_login.id } )
account_3 = Account.create( { account_name: 'Mortgage', institution: 'Wells Fargo', category: 'Loan', balance: -100000.25, user_id: demo_login.id } )
account_4 = Account.create( { account_name: 'Credit Card', institution: 'Chase', category: 'Loan', balance: -100.50, user_id: demo_login.id } )
account_5 = Account.create( { account_name: 'Individual', institution: 'Charles Schwab', category: 'Investment', balance: 0, user_id: demo_login.id } )
account_6 = Account.create( { account_name: 'Roth IRA', institution: 'Charles Schwab', category: 'Investment', balance: 0, user_id: demo_login.id } )

# checking account transactions - April, May, June

transaction_21 = Transaction.create( { description: 'Paycheck', category: 'Income', date: "2021-05-15", amount: 2000.50, account_id: account_1.id } )
transaction_22= Transaction.create( { description: 'Paycheck', category: 'Income', date: "2021-05-30", amount: 2000.50, account_id: account_1.id } )
transaction_23 = Transaction.create( { description: 'Mortgage Payment', category: 'Home', date: "2021-05-02", amount:  -1750.25, account_id: account_1.id } )
transaction_24 = Transaction.create( { description: 'Cox Internet', category: 'Bills and Utilities', date: "2021-05-05", amount: -70.12 , account_id: account_1.id} )
transaction_25 = Transaction.create( { description: 'Water Bill', category: 'Bills and Utilities', date: "2021-05-17", amount: -85.39 , account_id: account_1.id} )
transaction_26 = Transaction.create( { description: 'Energy Bill', category: 'Bills and Utilities', date: "2021-05-09", amount: -130.76 , account_id: account_1.id} )
transaction_27 = Transaction.create( { description: 'Trash Bill', category: 'Bills and Utilities', date: "2021-05-04", amount: -20.24 , account_id: account_1.id} )
transaction_28 = Transaction.create( { description: 'Sewer', category: 'Bills and Utilities', date: "2021-05-04", amount: -21.99 , account_id: account_1.id} )
transaction_29 = Transaction.create( { description: 'Gym Membership', category: 'Health and Fitness', date: "2021-05-20", amount: -90.99, account_id: account_1.id } )
transaction_30 = Transaction.create( { description: 'Philz Coffee', category: 'Food and Dining', date: "2021-05-06", amount:  -7.50, account_id: account_1.id } )
transaction_31  = Transaction.create( { description: 'Spotify', category: 'Entertainment', date: "2021-05-01", amount: -9.99, account_id: account_1.id } )
transaction_32  = Transaction.create( { description: 'Netflix', category: 'Entertainment', date: "2021-05-01", amount: -14, account_id: account_1.id } )
transaction_33  = Transaction.create( { description: 'Spa Trip', category: 'Personal Care', date: "2021-05-26", amount: -200.47, account_id: account_1.id } )
transaction_34  = Transaction.create( { description: 'Car Insurance', category: 'Misc Expenses', date: "2021-05-23", amount: -400.56, account_id: account_1.id } )
transaction_35  = Transaction.create( { description: 'Amazon', category: 'Shopping', date: "2021-05-07", amount: -71.25, account_id: account_1.id } )
transaction_36  = Transaction.create( { description: 'Acai Bowl', category: 'Food and Dining', date: "2021-05-06", amount: -15.12, account_id: account_1.id } )
transaction_37  = Transaction.create( { description: 'Archis', category: 'Food and Dining', date: "2021-05-24", amount: -90.38, account_id: account_1.id } )
transaction_38  = Transaction.create( { description: 'Hummus Bowls', category: 'Food and Dining', date: "2021-05-18", amount: -30.84, account_id: account_1.id } )
transaction_39  = Transaction.create( { description: 'Chipotle', category: 'Food and Dining', date: "2021-05-12", amount: -19.29, account_id: account_1.id } )
transaction_40  = Transaction.create( { description: 'Philz Coffee', category: 'Food and Dining', date: "2021-05-29", amount: -7.82, account_id: account_1.id } )
transaction_41 = Transaction.create( { description: 'Philz Coffee', category: 'Food and Dining', date: "2021-05-11", amount:  -6.75, account_id: account_1.id } )
transaction_42 = Transaction.create( { description: 'Philz Coffee', category: 'Food and Dining', date: "2021-05-17", amount:  -7.50, account_id: account_1.id } )
transaction_43 = Transaction.create( { description: 'Philz Coffee', category: 'Food and Dining', date: "2021-05-21", amount:  -6.75, account_id: account_1.id } )
transaction_44  = Transaction.create( { description: 'Chik Fila', category: 'Food and Dining', date: "2021-05-18", amount: -16.84, account_id: account_1.id } )

transaction_1 = Transaction.create( { description: 'Paycheck', category: 'Income', date: "2021-04-15", amount: 2000.50, account_id: account_1.id } )
transaction_2 = Transaction.create( { description: 'Paycheck', category: 'Income', date: "2021-04-30", amount: 2000.50, account_id: account_1.id } )
transaction_3 = Transaction.create( { description: 'Mortgage Payment', category: 'Home', date: "2021-04-02", amount:  -1750.25, account_id: account_1.id } )
transaction_4 = Transaction.create( { description: 'Cox Internet', category: 'Bills and Utilities', date: "2021-04-05", amount: -70.00 , account_id: account_1.id} )
transaction_5 = Transaction.create( { description: 'Water Bill', category: 'Bills and Utilities', date: "2021-04-17", amount: -75.39 , account_id: account_1.id} )
transaction_6 = Transaction.create( { description: 'Energy Bill', category: 'Bills and Utilities', date: "2021-04-09", amount: -110.76 , account_id: account_1.id} )
transaction_7 = Transaction.create( { description: 'Trash Bill', category: 'Bills and Utilities', date: "2021-04-04", amount: -20.24 , account_id: account_1.id} )
transaction_8 = Transaction.create( { description: 'Sewer', category: 'Bills and Utilities', date: "2021-04-04", amount: -21.99 , account_id: account_1.id} )
transaction_9 = Transaction.create( { description: 'Gym Membership', category: 'Health and Fitness', date: "2021-04-20", amount: -85.99, account_id: account_1.id } )
transaction_10 = Transaction.create( { description: 'Philz Coffee', category: 'Food and Dining', date: "2021-04-06", amount:  -7.50, account_id: account_1.id } )
transaction_11 = Transaction.create( { description: 'Spotify', category: 'Entertainment', date: "2021-04-01", amount: -9.99, account_id: account_1.id } )
transaction_12 = Transaction.create( { description: 'Netflix', category: 'Entertainment', date: "2021-04-01", amount: -14, account_id: account_1.id } )
transaction_13 = Transaction.create( { description: 'Sephora', category: 'Personal Care', date: "2021-04-26", amount: -150.47, account_id: account_1.id } )
transaction_14 = Transaction.create( { description: 'Amazon', category: 'Shopping', date: "2021-04-23", amount: -40.56, account_id: account_1.id } )
transaction_15 = Transaction.create( { description: 'Amazon', category: 'Shopping', date: "2021-04-07", amount: -71.25, account_id: account_1.id } )
transaction_16 = Transaction.create( { description: 'Chilis', category: 'Food and Dining', date: "2021-04-06", amount: -23.12, account_id: account_1.id } )
transaction_17 = Transaction.create( { description: 'Yukga KBBQ', category: 'Food and Dining', date: "2021-04-24", amount: -65.38, account_id: account_1.id } )
transaction_18 = Transaction.create( { description: 'Wendys', category: 'Food and Dining', date: "2021-04-18", amount: -16.84, account_id: account_1.id } )
transaction_19 = Transaction.create( { description: 'Chipotle', category: 'Food and Dining', date: "2021-04-12", amount: -19.29, account_id: account_1.id } )
transaction_20 = Transaction.create( { description: 'Philz Coffee', category: 'Food and Dining', date: "2021-04-29", amount: -7.82, account_id: account_1.id } )

transaction_45 = Transaction.create( { description: 'Paycheck', category: 'Income', date: "2021-06-15", amount: 2000.50, account_id: account_1.id } )
transaction_46 = Transaction.create( { description: 'Paycheck', category: 'Income', date: "2021-06-30", amount: 2000.50, account_id: account_1.id } )
transaction_47 = Transaction.create( { description: 'Mortgage Payment', category: 'Home', date: "2021-06-02", amount:  -1750.25, account_id: account_1.id } )
transaction_48 = Transaction.create( { description: 'Cox Internet', category: 'Bills and Utilities', date: "2021-06-05", amount: -70.00 , account_id: account_1.id} )
transaction_49 = Transaction.create( { description: 'Water Bill', category: 'Bills and Utilities', date: "2021-06-17", amount: -65.39 , account_id: account_1.id} )
transaction_50 = Transaction.create( { description: 'Energy Bill', category: 'Bills and Utilities', date: "2021-06-09", amount: -95.76 , account_id: account_1.id} )
transaction_51 = Transaction.create( { description: 'Trash Bill', category: 'Bills and Utilities', date: "2021-06-04", amount: -20.24 , account_id: account_1.id} )
transaction_52 = Transaction.create( { description: 'Sewer', category: 'Bills and Utilities', date: "2021-06-04", amount: -21.99 , account_id: account_1.id} )
transaction_53 = Transaction.create( { description: 'Gym Membership', category: 'Health and Fitness', date: "2021-06-20", amount: -85.99, account_id: account_1.id } )
transaction_54 = Transaction.create( { description: 'Philz Coffee', category: 'Food and Dining', date: "2021-06-06", amount:  -7.50, account_id: account_1.id } )
transaction_55 = Transaction.create( { description: 'Spotify', category: 'Entertainment', date: "2021-06-01", amount: -9.99, account_id: account_1.id } )
transaction_56 = Transaction.create( { description: 'Netflix', category: 'Entertainment', date: "2021-06-01", amount: -14, account_id: account_1.id } )
transaction_57 = Transaction.create( { description: 'Hair Cut', category: 'Personal Care', date: "2021-06-26", amount: -80.47, account_id: account_1.id } )
transaction_58 = Transaction.create( { description: 'Amazon', category: 'Shopping', date: "2021-06-23", amount: -20.56, account_id: account_1.id } )
transaction_60 = Transaction.create( { description: 'Capriottis', category: 'Food and Dining', date: "2021-06-06", amount: -40.12, account_id: account_1.id } )
transaction_61 = Transaction.create( { description: 'North Italia', category: 'Food and Dining', date: "2021-06-24", amount: -65.42, account_id: account_1.id } )
transaction_62 = Transaction.create( { description: 'Wendys', category: 'Food and Dining', date: "2021-06-18", amount: -16.84, account_id: account_1.id } )
transaction_63 = Transaction.create( { description: 'Chipotle', category: 'Food and Dining', date: "2021-06-12", amount: -19.29, account_id: account_1.id } )
transaction_64 = Transaction.create( { description: 'Philz Coffee', category: 'Food and Dining', date: "2021-06-29", amount: -7.82, account_id: account_1.id } )

# individual brokerage investments

investment_1 = Investment.create( { inv_name: 'Apple', ticker: 'AAPL', shares: 40.5, prev_close: 0.01, price_paid: 100.00, account_id: account_5.id, last_fetch: "2021-05-01" } )
investment_2 = Investment.create( { inv_name: 'Microsoft', ticker: 'MSFT', shares: 20.35, prev_close: 0.01, price_paid: 200.00, account_id: account_5.id, last_fetch: "2021-05-01"} )
investment_3 = Investment.create( { inv_name: 'Google', ticker: 'GOOGL', shares: 2.15, prev_close: 0.01, price_paid: 2000.00, account_id: account_5.id, last_fetch: "2021-05-01"} )
investment_4 = Investment.create( { inv_name: 'Zendesk', ticker: 'ZEN', shares: 38.00, prev_close: 0.01, price_paid: 95.00, account_id: account_5.id, last_fetch: "2021-05-01"} )

# Roth investments

investment_5 = Investment.create( { inv_name: 'Russell 3000 ETF', ticker: 'VTHR', shares: 144.00, prev_close: 0.01, price_paid: 135.00, account_id: account_6.id, last_fetch: "2021-05-01" } )
investment_6 = Investment.create( { inv_name: 'MSCI ACWI ETF', ticker: 'ACWI', shares: 70.00, prev_close: 0.01, price_paid: 88.00, account_id: account_6.id, last_fetch: "2021-05-01"} )
investment_7 = Investment.create( { inv_name: 'Total Bond ETF', ticker: 'BND', shares: 176.50, prev_close: 0.01, price_paid: 80.00, account_id: account_6.id, last_fetch: "2021-05-01"} )


# Fetch U.S. traded stocks, ETPS, and REITS

fetch_stocks = URI("https://finnhub.io/api/v1/stock/symbol?exchange=US&securityType=Common%20Stock&token=#{Rails.application.credentials.finnhub[:api_key]}")
all_stocks = Net::HTTP.get_response(fetch_stocks).body
all_stocks = JSON.parse(all_stocks)

all_stocks.each do |stock|
  Stock.create(
    { name: stock["description"],
      ticker: stock["symbol"]
    }
  )
end

fetch_etps = URI("https://finnhub.io/api/v1/stock/symbol?exchange=US&securityType=ETP&token=#{Rails.application.credentials.finnhub[:api_key]}")
all_etps = Net::HTTP.get_response(fetch_etps).body
all_etps = JSON.parse(all_etps) 

all_etps.each do |stock|
  Stock.create(
    name: stock["description"],
    ticker: stock["symbol"],
  )
end

fetch_reits = URI("https://finnhub.io/api/v1/stock/symbol?exchange=US&securityType=REIT&token=#{Rails.application.credentials.finnhub[:api_key]}")
all_reits = Net::HTTP.get_response(fetch_reits).body
all_reits = JSON.parse(all_reits) 

all_reits.each do |stock|
  Stock.create(
    name: stock["description"],
    ticker: stock["symbol"],
)
end

# Fetch U.S. traded ADRs & MLPS

# fetch_adrs = URI("https://finnhub.io/api/v1/stock/symbol?exchange=US&securityType=ADR&token=#{Rails.application.credentials.finnhub[:api_key]}")
# fetch_mlps = URI("https://finnhub.io/api/v1/stock/symbol?exchange=US&securityType=MLP&token=#{Rails.application.credentials.finnhub[:api_key]}")

# all_mlps = JSON.parse(fetch_mlps) 

# all_mlps.each do |stocks|
#   Stock.create(
#     name: stocks["description"],
#     ticker: stocks["symbol"],
#   )
# end

# all_adrs = JSON.parse(fetch_adrs) 

# all_adrs.each do |stocks|
#   Stock.create(
#     name: stocks["description"],
#     ticker: stocks["symbol"],
#   )
# end