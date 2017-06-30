class Event
  include Mongoid::Document

  field :type, type: string
  field :title, type: string
end