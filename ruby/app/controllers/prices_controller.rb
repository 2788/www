class PricesController < ApplicationController
  def index
    if params[:source].nil? == false && params[:source].blank? == false
      # /prices?source=fusion 重定向到 /prices?source=qcdn
      # https://jira.qiniu.io/browse/BO-11264
      if params[:source] == "fusion"
        redirect_to(:source => "qcdn", :status => 301)
      end
    end
  end

  def caculator
    @title = "caculator"
  end

  def caculator_qvm
    @title = "caculator_qvm"
  end
end