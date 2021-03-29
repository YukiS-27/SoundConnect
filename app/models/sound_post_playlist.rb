class SoundPostPlaylist < ApplicationRecord
  # 1つのプレイリストに対して同じ投稿は1つまで
  validates :sound_post_id, uniqueness: { scope: :playlist_id }

  belongs_to :sound_post
  belongs_to :playlist
end
