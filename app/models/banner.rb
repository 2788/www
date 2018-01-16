class Banner < ApplicationRecord

  default_scope -> { where(:is_published => 1, :deleted_at => nil) }

  scope :welcome_index, -> { where(:url => 'welcomeIndex').order(order: :asc) }

end