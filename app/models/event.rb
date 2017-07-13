class Event
  include Mongoid::Document
  include Mongoid::Timestamps

  store_in collection: "marketing_events"

  field :category, type: String
  field :name, type: String
  field :date, type: Date
  field :video, type: String
  field :cover, type: String
  field :ppt, type: String
  field :note, type: String
  field :speaker, type: String
  field :avatar, type: String
  field :title, type: String
  field :is_top, type: Boolean

  default_scope -> { desc(:date) }

end