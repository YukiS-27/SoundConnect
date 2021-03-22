class Playlist < ApplicationRecord
  belongs_to :user

  has_many :sound_post_playlists, dependent: :destroy
  has_many :sound_posts, through: :sound_post_playlists
  accepts_nested_attributes_for :sound_post_playlists, allow_destroy: true
end
