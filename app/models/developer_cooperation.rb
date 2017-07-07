class DeveloperCooperation
  include Mongoid::Document
  include Mongoid::Timestamps

  store_in collection: "marketing_developer_cooperation"

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
end
