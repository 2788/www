class CooperationsController < ApplicationController

  def index

  end

  def create_channel
    @channel_cooperation = Channel_cooperation.new(channel_cooperation_params)
    @channel_cooperation.uid = cookies['PORTAL_UID']
    @channel_cooperation.ip = request.remote_ip

    if @channel_cooperation.referer.blank?
      @channel_cooperation.referer = params[:referer] || request.referer || request.env['HTTP_REFERER']
    end

    if @channel_cooperation.save
      render :nothing => true, :status => :created
    else
      render json: @channel_cooperation.errors, status: :unprocessable_entity
    end
  end

  def create_developer
    @developer_cooperation = Developer_cooperation.new(developer_cooperation_params)
    @developer_cooperation.uid = cookies['PORTAL_UID']
    @developer_cooperation.ip = request.remote_ip

    if @developer_cooperation.referer.blank?
      @developer_cooperation.referer = params[:referer] || request.referer || request.env['HTTP_REFERER']
    end

    if @developer_cooperation.save
      render :nothing => true, :status => :created
    else
      render json: @developer_cooperation.errors, status: :unprocessable_entity
    end
  end

end
