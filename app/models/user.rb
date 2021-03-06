class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :validatable, :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable

  has_one :profile, dependent: :destroy, inverse_of: :user
  accepts_nested_attributes_for :profile

  has_many :sound_posts

  has_many :sound_post_likes
  has_many :like_sound_posts, through: :sound_post_likes, source: :sound_post

  has_many :playlists
  has_many :playlist_sound_posts, through: :playlists, source: :sound_post

  # has_many :from_messages, class_name: 'Messages', foreign_key: 'from_user_id'
  # has_many :to_messages, class_name: 'Messages', foreign_key: 'to_user_id'

  has_many :room_users
  has_many :rooms, through: :room_users

  has_many :messages

  def liked_by?(sound_post)
    sound_post_likes.where(sound_post_id: sound_post.id).exists?
  end
end
