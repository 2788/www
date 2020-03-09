class DeveloperCooperation
  include Mongoid::Document
  include Mongoid::Timestamps

  store_in collection: "marketing_developer_cooperations"

  field :resource_name, type: String
  field :resource_desc, type: String
  field :author_name, type: String
  field :phone, type: String
  field :im, type: String
  field :email, type: String
  field :website, type: String
  field :download_link, type: String
  field :doc_link, type: String
  field :sourcecode_link, type: String
  field :uid, type: Integer
  field :ip, type: String

  validates_format_of :email, :with => /\A(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\z/
  validates_format_of :phone, :with => /\A((\d{11})|^((\+86)|(86))?\d{11}$|^((\d{7,8})|(\d{4}|\d{3})-?(\d{7,8})|(\d{4}|\d{3})-?(\d{7,8})-?(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-?(\d{4}|\d{3}|\d{2}|\d{1}))$)\z/
  validates :resource_name, :resource_desc, :author_name, :im, :download_link, :doc_link, :sourcecode_link, presence: true
end
