sound_post_count = 3

sound_post_count.times do |n|
  SoundPost.seed do |s|
    s.id = (n + 1)
    s.title = "テストファイル#{n + 1}"
    s.sound_source = open("./public/seeds/sample#{n + 1}.mp3")
    s.instrument_id = (n + 1)
    s.user_id = (n + 1)
  end
end

puts 'サンプルファイル初期データの追加が完了しました！'
