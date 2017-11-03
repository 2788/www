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
  validates_format_of :phone, :with => /\A((\d{11})|^((\+86)|(86))?\d{11}$|^((\d{7,8})|(\d{4}|\d{3})-?(\d{7,8})|(\d{4}|\d{3})-?(\d{7,8})-?(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-?(\d{4}|\d{3}|\d{2}|\d{1}))$)\z/
  validates :province, :name, presence: true
end
