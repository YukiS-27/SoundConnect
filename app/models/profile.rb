class Profile < ApplicationRecord
  validates :name, presence: true

  belongs_to :user

  mount_uploader :avatar, ImageUploader
end
