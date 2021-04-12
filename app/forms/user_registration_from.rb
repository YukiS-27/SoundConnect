class UserRegistrationForm
  include ActiveModel::Model

  attr_accessor :email, :password, :name, :genre
  attr_reader :profile_attributes


  # メールアドレスの形式「---@---.---」
  VALID_EMAIL_REGEX = /\A[\w+\-._]+@[\w+\-._]+\.[a-z]+\z/i
  # 英数字混同
  VALID_PASSWORD_REGEX = /\A(?=.*?[a-z])(?=.*?\d)[a-z\d]+\z/
  with_options presence: true do
    validates :email,     format: { with: VALID_EMAIL_REGEX },
    validates :password,  format: { with: VALID_PASSWORD_REGEX }, length: { in: 8..32 }

    validates :name, length: { maximum: 20 },
  end

  # モデル2つを介して値を保存するメソッド
  def save
    # バリデーションに引っかかる場合はコントローラーにfalseを返す
    return false if invalid?

    user.assign_attributes(user_params)
    user.build_asscociation

    if user.save
      true
    else
      false
    end
  end

  private

  def user_params
    {
      email: user.email,
      password: user.password,
    }
  end

end
