class Recommendation
  include Mongoid::Document
  include Mongoid::Timestamps

  store_in collection: "customer_recommendations"

  field :company, type: String
  field :website, type: String
  field :business, type: String
  field :name, type: String
  field :phone, type: String
  field :im, type: String
  field :email, type: String
  field :intention, type: String
  field :referer, type: String
  field :ip, type: String
  field :uid, type: Integer
end
