class CreateProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles do |t|
      t.string :name, null: false
      t.text :introduction, null: false
      t.string :avatar
      t.string :genre

      t.timestamps
    end
  end
end
