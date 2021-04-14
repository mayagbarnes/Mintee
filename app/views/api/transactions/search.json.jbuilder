@transactions.each do |trans|
  json.set! trans.id do
    json.extract! trans, 
        :id, :description, :category, :amount, :date, :account_id
  end
end

# JBuilder screws up the order of @transactions provided 
# from the controller - object loses identity