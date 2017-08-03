class Feedback
  include Mongoid::Document
  include Mongoid::Timestamps

  store_in collection: "customer_feedbacks"

  field :content, type: String
  field :name, type: String
  field :company, type: String
  field :phone, type: String
  field :email, type: String
  field :uid, type: Integer
  field :referer, type: String # 来源网址
  field :ip, type: String
end
