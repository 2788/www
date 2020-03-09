class FeedbacksController < ApplicationController
  layout "form"

  AUTHENTICITY_TOKEN_LENGTH = 32

  # POST /feedbacks
  # POST /feedbacks.json
  def create
    @feedback = Feedback.new(feedback_params)

    if !verified_request
      render json: @feedback.errors, status: :forbidden
      return
    end

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

  def verified_request
    request.get? || valid_authenticity_token(session, params[:authenticity_token]) && valid_authenticity_token(session, request.headers['X-CSRF-Token'])
  end

  def valid_authenticity_token(session, encoded_masked_token)
    if encoded_masked_token.nil? || encoded_masked_token.empty? || !encoded_masked_token.is_a?(String)
      return false
    end

    masked_token = Base64.strict_decode64(encoded_masked_token)

    if masked_token.length == AUTHENTICITY_TOKEN_LENGTH
      compare_with_real_token(masked_token, session)
    elsif masked_token.length == AUTHENTICITY_TOKEN_LENGTH * 2
      one_time_pad = masked_token[0...AUTHENTICITY_TOKEN_LENGTH]
      encrypted_csrf_token = masked_token[AUTHENTICITY_TOKEN_LENGTH..-1]
      csrf_token = xor_byte_strings(one_time_pad, encrypted_csrf_token)
      compare_with_real_token(csrf_token, session)
    else
      false
    end
  end

  def xor_byte_strings(s1, s2)
    s1.bytes.zip(s2.bytes).map { |(c1,c2)| c1 ^ c2 }.pack('c*')
  end

  def compare_with_real_token(token, session)
    ActiveSupport::SecurityUtils.secure_compare(token, real_csrf_token(session))
  end

  def real_csrf_token(session)
    session[:_csrf_token] ||= SecureRandom.base64(AUTHENTICITY_TOKEN_LENGTH)
    Base64.strict_decode64(session[:_csrf_token])
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def feedback_params
      params.require(:feedback).permit(:content, :company, :name, :phone, :email, :province)
    end
end
