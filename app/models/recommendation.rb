class Recommendation
  include Mongoid::Document
  include Mongoid::Timestamps

  store_in collection: "marketing_recommendations"

  field :company, type: String
  field :city, type: String
  field :name, type: String
  field :position, type: String
  field :email, type: String
  field :phone, type: String
  field :desc, type: String
  field :emergency, type: Integer
  field :recommender_name, type: String
  field :recommender_phone, type: String
  field :ip, type: String
  field :uid, type: Integer
  field :referer, type: String
end
