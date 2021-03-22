class SoundPost < ApplicationRecord
  belongs_to :user
  belongs_to :instrument

  mount_uploader :sound_source, AudiofileUploader
end
