class FeedbacksController < ApplicationController
  layout "form"

  # POST /feedbacks
  # POST /feedbacks.json
  def create
    @feedback = Feedback.new(feedback_params)
    @feedback.uid = cookies['PORTAL_UID']
    @feedback.ip = client_ip

    if @feedback.referer.blank?
      @feedback.referer = params[:referer] || request.referer || request.env['HTTP_REFERER']
    end

    if @feedback.save
      head :created
    else
      render json: @feedback.errors, status: :unprocessable_entity
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def feedback_params
      params.require(:feedback).permit(:name, :phone, :email, :province)
    end
end
