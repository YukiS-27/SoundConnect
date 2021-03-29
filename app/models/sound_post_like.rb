class SoundPostLike < ApplicationRecord
  belongs_to :user
  belongs_to :sound_post
end
