class ChannelCooperation
  include Mongoid::Document
  include Mongoid::Timestamps

  store_in collection: "marketing_channel_cooperations"

  field :company, type: String
  field :website, type: String
  field :business, type: String
  field :name, type: String
  field :phone, type: String
  field :im, type: String
  field :email, type: String
  field :intention, type: String
  field :uid, type: Integer
  field :ip, type: String

  validates_format_of :email, :with => /\A(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\z/
  validates :phone, length: { in: 8..11 }
  validates :company, :website, :business, :name, :im, presence: true
end