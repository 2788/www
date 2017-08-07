class CooperationsController < ApplicationController

  def index

  end

  def create_channel
    @channel_cooperation = ChannelCooperation.new(channel_cooperation_params)
    @channel_cooperation.uid = cookies['PORTAL_UID']
    @channel_cooperation.ip = client_ip

    if @channel_cooperation.save
      render :nothing => true, :status => :created
    else
      render json: @channel_cooperation.errors, status: :unprocessable_entity
    end
  end

  def create_developer
    @developer_cooperation = DeveloperCooperation.new(developer_cooperation_params)
    @developer_cooperation.uid = cookies['PORTAL_UID']
    @developer_cooperation.ip = client_ip

    if @developer_cooperation.save
      render :nothing => true, :status => :created
    else
      render json: @developer_cooperation.errors, status: :unprocessable_entity
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def channel_cooperation_params
      params.require(:channel_cooperation).permit(:company, :website, :business, :name, :phone, :im, :email, :intention)
    end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def developer_cooperation_params
      params.require(:developer_cooperation).permit(:resource_name, :resource_desc, :author_name, :phone, :im, :email, :website, :download_link, :doc_link, :sourcecode_link)
    end
end
