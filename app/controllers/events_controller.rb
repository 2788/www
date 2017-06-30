class EventsController < ApplicationController
  def index
  end

  def list
    @title = "list"
    @uniData = params[:uni_data]
  end
end
