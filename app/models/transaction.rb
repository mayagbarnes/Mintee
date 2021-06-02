class Transaction < ApplicationRecord
    validates :account_id, :date, :description, :category, :amount, presence: true

    belongs_to :account,
        foreign_key: :account_id,
        class_name: :Account
    
    has_one :user, 
        through: :account,
        source: :user
end
