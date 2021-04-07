class Account < ApplicationRecord
    validates :account_name, presence: true, uniqueness: true
    validates :institution, :category, :balance, presence: true

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

end
