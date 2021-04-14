# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Account.delete_all
Transaction.delete_all
Investment.delete_all



demo_login = User.create( {username: 'DemoLogin', password: '123456'})
account_1 = Account.create( { account_name: 'Checking', institution: 'Citi', category: 'Cash', balance: 1000.77, user_id: demo_login.id} )
account_2 = Account.create( { account_name: 'Savings', institution: 'Bank of America', category: 'Cash', balance: 4000.50, user_id: demo_login.id } )
account_3 = Account.create( { account_name: 'Mortgage', institution: 'Wells Fargo', category: 'Loan', balance: -100000.25, user_id: demo_login.id } )
account_4 = Account.create( { account_name: 'Credit Card', institution: 'Chase', category: 'Loan', balance: -100.50, user_id: demo_login.id } )
account_5 = Account.create( { account_name: 'Individual', institution: 'Charles Schwab', category: 'Investment', balance: 1500.50, user_id: demo_login.id } )
account_6 = Account.create( { account_name: 'Roth IRA', institution: 'Charles Schwab', category: 'Investment', balance: 7000.30, user_id: demo_login.id } )

# account1 - transactions

transaction_1 = Transaction.create( { description: 'Cox Internet', category: 'Bills and Utilities', date: "2021-04-09", amount: -70.00 , account_id: account_1.id} )
transaction_2 = Transaction.create( { description: 'Wendys', category: 'Food and Dining', date: "2021-04-09", amount: -20.50, account_id: account_1.id } )
transaction_3 = Transaction.create( { description: 'Amazon', category: 'Shopping', date: "2021-04-07", amount:  -40.25, account_id: account_1.id } )
transaction_4 = Transaction.create( { description: 'Credit Card Payment', category: 'Bills and Utilities', date: "2021-04-06", amount:  -300.50, account_id: account_1.id } )
transaction_5 = Transaction.create( { description: 'Paycheck', category: 'Income', date: "2021-04-06", amount: 2500.50, account_id: account_1.id } )
transaction_6 = Transaction.create( { description: 'Gym Membership', category: 'Health and Fitness', date: "2021-04-05", amount: -75.00, account_id: account_1.id } )

# account1 - investments

investment_1 = Investment.create( { inv_name: 'Apple', ticker: 'AAPL', shares: 100.00, price_paid: 100.00, account_id: account_1.id} )
investment_2 = Investment.create( { inv_name: 'Microsoft', ticker: 'MSFT', shares: 50.00, price_paid: 200.00, account_id: account_1.id} )
investment_3 = Investment.create( { inv_name: 'Google', ticker: 'GOOGL', shares: 1.00, price_paid: 2000.00, account_id: account_1.id} )


# transaction = { description: 'yikes', category: 'Health and Fitness', date: "2021-10-31", amount: -75.00, account_id: 26 }
# $.ajax({
#         method: 'GET',
#         url: '/api/transactions/search',
#         data: {query: 'pay'}
# })
