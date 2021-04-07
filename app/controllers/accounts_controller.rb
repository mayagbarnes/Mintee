class AccountsController < ApplicationController
    before_action :require_logged_in, only: [:create, :edit, :destroy, :show, :index]

    def show
        @account = current_user.accounts.find_by(id: params[:id])
    end

    def index
        @accounts = current_user.accounts
    end

    def create
        @account = current_user.accounts.new(account_params)
        if @account.save
            render "api/accounts/show"
        else
            render json: @account.errors.full_messages, status: 422
        end
    end

    def update
        @account = current_user.accounts.find_by(id: params[:id])
        if @account.update(account_params)
            render "api/accounts/show"
        else
            render json: @account.errors.full_messages, status: 422
        end
    end

    def destroy
        @account = current_user.accounts.find_by(id: params[:id])
        if @account && @goal.delete
            render "api/accounts/index"
        end
    end

    private
    def account_params
        params.require(:account).permit(:account_name, :institution, :category, :balance, :user_id)
    end
    
end
