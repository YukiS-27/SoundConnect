class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :sound_posts

  has_many :sound_post_likes
  has_many :sound_post_like_users, through: :sound_post_likes, source: :sound_post

  has_many :playlists
  has_many :playlist_sound_posts, through: :playlists, source: :sound_post

end
