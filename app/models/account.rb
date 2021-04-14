class Account < ApplicationRecord
    validates :account_name, :institution, :category, :balance, :user_id, presence: true

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    has_many :transactions, 
        foreign_key: :account_id,
        class_name: :Transaction,
        dependent: :destroy

    has_many :investments, 
        foreign_key: :account_id,
        class_name: :Investment,
        dependent: :destroy

end
