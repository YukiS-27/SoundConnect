class SoundPost < ApplicationRecord
  with_options presence: true do
    validates :user_id
    validates :title
    validates :description
    validates :sound_source
  end

  belongs_to :user
  belongs_to :instrument

  has_many :sound_post_playlists, dependent: :destroy
  has_many :playlists, through: :sound_post_playlists

  mount_uploader :sound_source, AudiofileUploader
end
