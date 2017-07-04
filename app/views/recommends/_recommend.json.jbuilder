json.extract! feedback, :id, :content, :name, :company, :phone, :created_at, :updated_at
json.url feedback_url(feedback, format: :json)
