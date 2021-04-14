# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_13_162052) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "account_name", null: false
    t.string "institution", null: false
    t.string "category", null: false
    t.decimal "balance", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_name"], name: "index_accounts_on_account_name"
    t.index ["category"], name: "index_accounts_on_category"
    t.index ["institution"], name: "index_accounts_on_institution"
    t.index ["user_id"], name: "index_accounts_on_user_id"
  end

  create_table "investments", force: :cascade do |t|
    t.string "inv_name", null: false
    t.string "ticker", null: false
    t.decimal "shares", null: false
    t.decimal "price_paid", null: false
    t.integer "account_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_investments_on_account_id"
    t.index ["inv_name"], name: "index_investments_on_inv_name"
    t.index ["ticker"], name: "index_investments_on_ticker"
  end

  create_table "transactions", force: :cascade do |t|
    t.string "description", null: false
    t.string "category", null: false
    t.decimal "amount", null: false
    t.date "date", null: false
    t.integer "account_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_transactions_on_account_id"
    t.index ["category"], name: "index_transactions_on_category"
    t.index ["description"], name: "index_transactions_on_description"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
