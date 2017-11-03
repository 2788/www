class Recommendation
  include Mongoid::Document
  include Mongoid::Timestamps

  store_in collection: "marketing_recommendations"

  field :company, type: String
  field :province, type: String
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

  validates_format_of :email, :with => /\A(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\z/
  validates :phone, :recommender_phone, length: { in: 8..11 }
  validates :desc, length: { maximum: 200 }
  validates :company, :province, :city, :name, :position, :emergency, :recommender_name, presence: true
end
