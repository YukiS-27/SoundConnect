class SoundPost < ApplicationRecord
  with_options presence: true do
    validates :user_id
    validates :title
    validates :description
    validates :sound_source
  end

  belongs_to :user
  belongs_to :instrument

  has_many :sound_post_moods, dependent: :destroy
  has_many :moods, through: :sound_post_moods

  has_many :sound_post_likes
  has_many :sound_post_like_users, through: :sound_post_likes, source: :user

  has_many :sound_post_playlists, dependent: :destroy
  has_many :playlists, through: :sound_post_playlists

  mount_uploader :sound_source, AudiofileUploader

  # def liked_by?(user)
  #   sound_post_likes.where(user_id: user.id).exists?
  # end
end
