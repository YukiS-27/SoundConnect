class SoundPost < ApplicationRecord
  belongs_to :user
  has_one :instrument

  mount_uploader :sound_source, AudiofileUploader
end
