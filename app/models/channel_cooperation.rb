class ChannelCooperation
  include Mongoid::Document
  include Mongoid::Timestamps

  store_in collection: "marketing_channel_cooperation"

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
end

