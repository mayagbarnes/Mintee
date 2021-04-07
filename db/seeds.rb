# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Account.delete_all

demo_login = User.create( {username: 'DemoLogin', password: '123456'})
account_1 = Account.create( { account_name: 'Checking', institution: 'Citi', category: 'Cash', balance: 1000.77, user_id: demo_login.id} )
account_2 = Account.create( { account_name: 'Savings', institution: 'Bank of America', category: 'Cash', balance: 4000.50, user_id: demo_login.id } )
account_3 = Account.create( { account_name: 'Mortgage', institution: 'Wells Fargo', category: 'Loan', balance: -100000.25, user_id: demo_login.id } )
account_4 = Account.create( { account_name: 'Credit Card', institution: 'Chase', category: 'Loan', balance: -100.50, user_id: demo_login.id } )
account_5 = Account.create( { account_name: 'Individual', institution: 'Charles Schwab', category: 'Investment', balance: 1500.50, user_id: demo_login.id } )
account_6 = Account.create( { account_name: 'Roth IRA', institution: 'Charles Schwab', category: 'Investment', balance: 7000.30, user_id: demo_login.id } )

