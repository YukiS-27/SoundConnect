class Mood < ApplicationRecord
  has_many :sound_post_moods, dependent: :destroy
  has_many :sound_posts, through: :sound_post_moods
end
