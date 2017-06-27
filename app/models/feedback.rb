class Feedback
  include Mongoid::Document
  include Mongoid::Timestamps

  field :content, type: String
  field :name, type: String
  field :company, type: String
  field :phone, type: String
  field :uid, type: Integer
end
