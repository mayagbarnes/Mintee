class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :description, null: false
      t.string :category, null: false
      t.decimal :amount, null: false
      t.date :date, null: false
      t.integer :account_id, null: false
      t.timestamps
    end
    add_index :transactions, :description
    add_index :transactions, :category
    add_index :transactions, :account_id
  end
end
