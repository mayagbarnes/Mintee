class CreateInvestments < ActiveRecord::Migration[5.2]
  def change
    create_table :investments do |t|
      t.string :inv_name, null: false
      t.string :ticker, null: false
      t.decimal :shares, null: false
      t.decimal :prev_close, null: false
      t.decimal :price_paid, null: false
      t.integer :account_id, null: false
      t.date :last_fetch, null: false
      t.timestamps
    end
    add_index :investments, :inv_name
    add_index :investments, :ticker
    add_index :investments, :account_id
  end
end
