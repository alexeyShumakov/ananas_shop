User.seed do |s|
  s.id    = 1
  s.email = "jon@example.com"
  s.password = "password"
  s.password_confirmation = "password"
end

jon = User.first
jon.skip_confirmation!
jon.save

