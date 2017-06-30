class Event
  include Mongoid::Document

  field :type, type: String
  field :title, type: String
end