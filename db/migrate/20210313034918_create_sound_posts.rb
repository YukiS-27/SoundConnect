class CreateSoundPosts < ActiveRecord::Migration[6.1]
  def change
    create_table :sound_posts do |t|
      t.integer :user_id, null: false, foreign_key: true
      t.integer :instrument_id, null: false, foreign_key: true
      t.string :title, null: false
      t.string :description, default: "説明はありません。"
      t.string :sound_source, null: false
      t.string :sound_source_path, null: false

      t.timestamps
    end
  end
end
