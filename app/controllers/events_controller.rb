class EventsController < ApplicationController
  def index
    @niushows = Event.where( category: 'NiuShow').limit(3)
    @teches = Event.where( category: 'TechOnline').limit(3)
    @ecugs = Event.where( category: 'ECUG').limit(3)
  end

  def tech_online
    @events = Event.where( category: 'TechOnline').limit(9)
    render "list"
  end

  def ecug
    @events = Event.where( category: 'ECUG').limit(9)
    render "list"
  end

  def niushow
    @events = Event.where( category: 'NiuShow').limit(9)
    render "list"
  end
end
