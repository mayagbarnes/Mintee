class Api::TransactionsController < ApplicationController
    before_action :require_logged_in, only: [:create, :edit, :destroy, :show, :index]

    def show
        @transaction = current_user.transactions.find_by(id: params[:id])
        # render json: @transaction
    end

    def index
        @transactions = current_user.transactions
        # render json: @transactions
        # dont need jbuilder when returning 
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

    def search 
        # query = params[:query] "%#{params[:search]}%"
        @transactions = current_user.transactions.where("transactions.description ILIKE ?", "%#{params[:query]}%")
    end

    private
    def transaction_params
        params.require(:transaction).permit(:description, :category, :amount, :date, :account_id)
    end


end
