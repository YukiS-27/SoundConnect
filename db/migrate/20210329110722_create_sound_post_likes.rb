class CreateSoundPostLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :sound_post_likes do |t|
      t.references :user, foreign_key: true
      t.references :sound_post, foreign_key: true

      t.timestamps
    end
  end
end
