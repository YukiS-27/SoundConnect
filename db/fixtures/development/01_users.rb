user_count = profile_count = 3

user_count.times do |n|
  User.seed do |s|
    s.id = (n + 1)
    s.email = "test#{n + 1}@test.com"
    s.password = "test0000"
  end
end

profile_count.times do |n|
  Profile.seed do |s|
    s.user_id = (n + 1)
    s.name = "ユーザー#{n + 1}"
    s.introduction = "よろしくお願いします"
  end
end
