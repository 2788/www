class FeedbacksController < ApplicationController
  before_action :set_feedback, only: [:show, :edit, :update, :destroy]

  # POST /feedbacks
  # POST /feedbacks.json
  def create
    @feedback = Feedback.new(feedback_params)
    @feedback.uid = cookies['PORTAL_UID']

    if @feedback.save
      render json: @feedback, status: :created
    else
      render json: @feedback.errors, status: :unprocessable_entity
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def feedback_params
      params.require(:feedback).permit(:content, :name, :company, :phone)
    end
end
