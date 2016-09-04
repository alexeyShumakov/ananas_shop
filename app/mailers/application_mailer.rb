class ApplicationMailer < ActionMailer::Base
  default from: '"Ананас Магазин" <no-replay@ananas-journal.ru>', subject: 'Ананас'
  layout 'mailer'
end
