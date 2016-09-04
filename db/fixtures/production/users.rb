User.seed do |s|
  s.id    = 1
  s.email = "admin@shop.com"
  s.password = "password"
  s.password_confirmation = "password"
  s.confirmed_at = Date.today
  s.role = 1
end
