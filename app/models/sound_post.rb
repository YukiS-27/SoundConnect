class SoundPost < ApplicationRecord
  mount_uploader :file, AudiofileUploader
end
