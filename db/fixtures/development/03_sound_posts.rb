sound_post_count = 3

sound_post_count.times do |n|
  SoundPost.seed do |s|
    s.id = (n + 1)
    s.title = "テストファイル#{n + 1}"
    s.description = "テスト投稿だよ"
    # s.sound_source = open("public/assets/sample#{n + 1}.mp3")
    s.sound_source = Rails.root.join("public/assets/sample#{n + 1}.mp3").open
    s.instrument_id = (n + 1)
    s.user_id = (n + 1)
  end
end

puts 'サンプルファイル初期データの追加が完了しました！'
