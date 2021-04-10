class Api::TransactionsController < ApplicationController
    before_action :require_logged_in, only: [:create, :edit, :destroy, :show, :index]

    def show
        @transaction = current_user.transactions.find_by(id: params[:id])
    end

    def index
        @transactions = current_user.transactions
    end

    def create
        @transaction = Transaction.new(transaction_params)
        if @transaction.save
            render "api/transactions/show"
        else
            render json: @transaction.errors.full_messages, status: 422
        end
    end

    def update
        @transaction = current_user.transactions.find_by(id: params[:id])
        if @transaction.update(transaction_params)
            render "api/transactions/show"
        else
            render json: @transaction.errors.full_messages, status: 422
        end
    end

    def destroy
        @transaction = current_user.transactions.find_by(id: params[:id])
        if @transaction && @transaction.destroy
            render json: @transaction
        end
    end

    private
    def transaction_params
        params.require(:transaction).permit(:description, :category, :amount, :date, :account_id)
    end


end
