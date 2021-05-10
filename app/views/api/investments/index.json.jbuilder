@investments.each do |inv|
  json.set! inv.id do
    json.extract! inv, 
      :id, :inv_name, :ticker, :shares, :prev_close, :price_paid, :account_id, :last_fetch
  end
end

# JBuilder screws up the order of @transactions provided 
# from the controller - object loses identity