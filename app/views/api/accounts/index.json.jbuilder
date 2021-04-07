@accounts.each do |account|
  json.set! account.id do
    json.extract! account, 
        :id, :account_name, :institution, :category, :balance, :user_id
  end
end
