class Feedback
  include Mongoid::Document
  include Mongoid::Timestamps

  store_in collection: "customer_feedbacks"

  field :content, type: String
  field :name, type: String
  field :company, type: String
  field :province, type: String
  field :phone, type: String
  field :email, type: String
  field :uid, type: Integer
  field :referer, type: String # 来源网址
  field :ip, type: String

  validates_format_of :email, :with => /\A(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\z/
  validates :content, length: { maximum: 255 }
  validates :phone, length: { in: 8..11 }
  validates :province, :name, presence: true
end
