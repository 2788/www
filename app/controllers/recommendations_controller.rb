class RecommendationsController < ApplicationController
  layout "form"

  # POST /recommendations.json
  def create
    @recommendation = Recommendation.new(recommendation_params)
    @recommendation.uid = cookies['PORTAL_UID']
    @recommendation.ip = request.remote_ip

    if @recommendation.referer.blank?
      @recommendation.referer = params[:referer] || request.referer || request.env['HTTP_REFERER']
    end

    if @recommendation.save
      render :nothing => true, :status => :created
    else
      render json: @recommendation.errors, status: :unprocessable_entity
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def recommendation_params
      params.require(:recommendation).permit(:company, :website, :business, :name, :phone, :im, :email, :intention, :referer, :ip, :uid)
    end
end
