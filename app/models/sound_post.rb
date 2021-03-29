class SoundPost < ApplicationRecord
  belongs_to :user
  belongs_to :instrument

  has_many :sound_post_playlists, dependent: :destroy
  has_many :playlists, through: :sound_post_playlists

  mount_uploader :sound_source, AudiofileUploader
end
