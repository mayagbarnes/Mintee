class Transaction < ApplicationRecord
    validates :description, :category, :amount, :date, :account_id, presence: true

    belongs_to :account,
        foreign_key: :account_id,
        class_name: :Account
    
    has_one :user, 
        through: :account,
        source: :user
end
