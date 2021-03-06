class User < ApplicationRecord
    validates :password_digest, presence: true
    validates :session_token, :username, presence: true, uniqueness: true
    validates :password, length: {minimum: 6}, allow_nil: true

    after_initialize :ensure_session_token
    attr_reader :password

    has_many :accounts, 
        foreign_key: :user_id,
        class_name: :Account,
        dependent: :destroy

    has_many :transactions, 
        through: :accounts,
        source: :transactions,
        dependent: :destroy

    has_many :investments, 
        through: :accounts,
        source: :investments,
        dependent: :destroy

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return nil unless user
        user.is_password?(password) ? user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom::urlsafe_base64
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= SecureRandom::urlsafe_base64
    end

end
