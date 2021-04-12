class RemoveColumnsInUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :name, :string
    remove_column :users, :introduction, :text
    remove_column :users, :avatar, :string
    remove_column :users, :genre, :string
  end
end
