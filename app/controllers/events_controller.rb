class EventsController < ApplicationController
  def index
  end

  def tech_online
    @events = Event.where( category: 'tech_online')
    render "list"
  end

  def ecug
    @events = Event.where( category: 'ecug')
    render "list"
  end

  def niushow
    @events = Event.where( category: 'niushow')
    render "list"
  end
end
