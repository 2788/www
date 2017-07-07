class ChannelCooperation
  include Mongoid::Document
  include Mongoid::Timestamps

  store_in collection: "marketing_channel_cooperation"

  field :name, type: String
  field :phone, type: String
  field :qq, type: String
  field :email, type: String
  field :company, type: String
  field :website, type: String
  field :content, type: String
  field :uid, type: Integer
  field :ip, type: String
end
