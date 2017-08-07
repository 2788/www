class RecommendationsController < ApplicationController
  layout "form"

  # POST /recommendations.json
  def create
    @recommendation = Recommendation.new(recommendation_params)
    @recommendation.uid = cookies['PORTAL_UID']
    @recommendation.ip = client_ip

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
      params.require(:recommendation).permit(:company, :province, :city, :name, :position, :email, :phone, :desc, :emergency, :recommender_name, :recommender_phone, :ip, :uid, :referer)
    end
end
