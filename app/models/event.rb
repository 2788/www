class Event
  include Mongoid::Document
  include Mongoid::Timestamps

  store_in collection: "marketing_events"

  field :title, type: String
  field :category, type: String
end