class SoundPostMood < ApplicationRecord
  belongs_to :sound_post
  belongs_to :mood
end
