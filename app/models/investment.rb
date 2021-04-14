class Investment < ApplicationRecord
    validates :inv_name, :ticker, :shares, :price_paid, :account_id, presence: true

    belongs_to :account,
        foreign_key: :account_id,
        class_name: :Account

    has_one :user, 
        through: :account,
        source: :user
    
end
