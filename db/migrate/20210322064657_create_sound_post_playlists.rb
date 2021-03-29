class CreateSoundPostPlaylists < ActiveRecord::Migration[6.1]
  def change
    create_table :sound_post_playlists do |t|
      t.integer :sound_post_id, null: false, index: true
      t.integer :playlist_id, null: false, index: true

      t.timestamps
    end
  end
end
