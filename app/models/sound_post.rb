class SoundPost < ApplicationRecord
  belongs_to :user

  mount_uploader :sound_source, AudiofileUploader
end
