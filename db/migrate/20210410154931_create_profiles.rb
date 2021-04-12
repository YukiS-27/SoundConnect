class CreateProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.text :introduction
      t.string :avatar, default: ""
      t.string :genre

      t.timestamps
    end
  end
end
