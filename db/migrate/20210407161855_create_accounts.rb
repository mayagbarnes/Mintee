class CreateAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :accounts do |t|
      t.string :account_name, null: false
      t.string :institution, null: false
      t.string :category, null: false
      t.decimal :balance, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :accounts, :account_name
    add_index :accounts, :institution
    add_index :accounts, :category
    add_index :accounts, :user_id
  end
end
