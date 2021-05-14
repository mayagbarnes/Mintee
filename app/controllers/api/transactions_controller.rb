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
            # Update to Account Balance:
            @account = current_user.accounts.find_by(id: @transaction.account)
            @account.balance = @account.balance + @transaction.amount
            @account.save
            render "api/transactions/show"
        else
            render json: @transaction.errors.full_messages, status: 422
        end
    end

    def update
        @transaction = current_user.transactions.find_by(id: params[:id])
        old_amount = @transaction.amount
        new_amount =  params[:transaction][:amount].to_f
        if @transaction.update(transaction_params)
            if old_amount != new_amount
                @account = current_user.accounts.find_by(id: @transaction.account)
                @account.balance = @account.balance - old_amount + new_amount
                @account.save
            end
            render "api/transactions/show"
        else
            render json: @transaction.errors.full_messages, status: 422
        end
    end

    def destroy
        @transaction = current_user.transactions.find_by(id: params[:id])
        transaction_value = @transaction.amount
        transaction_account = @transaction.account
        if @transaction && @transaction.destroy
            @account = current_user.accounts.find_by(id: transaction_account)
            @account.balance = @account.balance - transaction_value
            @account.save
            render json: @transaction
        end
    end

    def search 
        # query = params[:query] "%#{params[:search]}%"
        @transactions = current_user.transactions
            .where("transactions.description ILIKE ? OR transactions.category ILIKE ?", "%#{params[:query]}%", "%#{params[:query]}%")
    end

    private
    def transaction_params
        params.require(:transaction).permit(:description, :category, :amount, :date, :account_id)
    end


end
