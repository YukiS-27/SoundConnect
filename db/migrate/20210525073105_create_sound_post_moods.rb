class CreateSoundPostMoods < ActiveRecord::Migration[6.1]
  def change
    create_table :sound_post_moods do |t|
      t.references :sound_post, null: false, foreign_key: true
      t.references :mood, null: false, foreign_key: true

      t.timestamps
    end
  end
end
