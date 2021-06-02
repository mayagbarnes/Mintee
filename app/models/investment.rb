class Investment < ApplicationRecord
    validates :account_id, :inv_name, :shares, :price_paid, presence: true
    validates :prev_close, numericality: {other_than: 0, message: 'Invalid Ticker'}

    belongs_to :account,
        foreign_key: :account_id,
        class_name: :Account

    has_one :user, 
        through: :account,
        source: :user
    
end
