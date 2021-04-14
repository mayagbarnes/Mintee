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
            render "api/investments/show"
        else
            render json: @investment.errors.full_messages, status: 422
        end
    end

    def update
        @investment = current_user.investments.find_by(id: params[:id])
        if @investment.update(investment_params)
            render "api/investments/show"
        else
            render json: @investment.errors.full_messages, status: 422
        end
    end

    def destroy
        @investment = current_user.investments.find_by(id: params[:id])
        if @investment && @investment.destroy
            render json: @investment
        end
    end

    def search 
        @investments = current_user.investments.where("investments.inv_name ILIKE ?", "%#{params[:query]}%")
    end

    private
    def investment_params
        params.require(:investment).permit(:inv_name, :ticker, :shares, :price_paid, :account_id)
    end
end
