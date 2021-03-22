class SoundPostPlaylist < ApplicationRecord
  belongs_to :sound_post
  belongs_to :playlist
end
