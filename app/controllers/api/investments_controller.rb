class Api::InvestmentsController < ApplicationController
    before_action :require_logged_in, only: [:create, :edit, :destroy, :show, :index]

    def show
        @investment = current_user.investments.find_by(id: params[:id])
    end

    def index
        @investments = current_user.investments
    end

    def create
        @investment = Investment.new(investment_params)
        if @investment.save
             # Update to Account Balance:
            @account = current_user.accounts.find_by(id: @investment.account)
            @account.balance = @account.balance + (@investment.shares * @investment.prev_close)
            @account.save
            render "api/investments/show"
        else
            render json: @investment.errors.full_messages, status: 422
            # render json: @investment.errors.messages, status: 422
        end
    end

    def update
        @investment = current_user.investments.find_by(id: params[:id])
        old_amount = (@investment.shares * @investment.prev_close)
        new_amount =  (params[:investment][:shares].to_f * params[:investment][:prev_close].to_f)
        if @investment.update(investment_params)
            if old_amount != new_amount
                 # Adjusting Account Balance:
                @account = current_user.accounts.find_by(id: @investment.account)
                @account.balance = @account.balance - old_amount + new_amount
                @account.save
            end
            render "api/investments/show"
        else
            render json: @investment.errors.full_messages, status: 422
        end
    end

    def destroy
        @investment = current_user.investments.find_by(id: params[:id])
        investment_value = @investment.shares * @investment.prev_close
        investment_account = @investment.account
        if @investment && @investment.destroy
            # Remove investment from Account Balance:
            @account = current_user.accounts.find_by(id: investment_account)
            @account.balance = @account.balance - investment_value
            @account.save
            render json: @investment
        end
    end

    def search 
        @investments = current_user.investments.where("investments.inv_name ILIKE ? OR investments.ticker ILIKE ?", "%#{params[:query]}%", "%#{params[:query]}%")
    end

    private
    def investment_params
        params.require(:investment).permit(:inv_name, :ticker, :shares, :prev_close, :price_paid, :account_id, :last_fetch)
    end
end
