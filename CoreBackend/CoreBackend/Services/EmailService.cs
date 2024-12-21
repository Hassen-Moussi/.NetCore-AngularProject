using System.Net.Mail;
using System.Net;
using CoreBackend.Models;
using Microsoft.Extensions.Options;

namespace CoreBackend.Services
{

    public interface IEmailService
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly SmtpSettings _smtpSettings;
        public EmailService(IConfiguration configuration , IOptions<SmtpSettings> smtpSettings)
        {
            _configuration = configuration;
            _smtpSettings = smtpSettings?.Value ?? throw new ArgumentNullException(nameof(smtpSettings));
        }



        public async Task SendEmailAsync(string email, string subject, string message)
        {
            if (string.IsNullOrEmpty(_smtpSettings.Host))
                throw new ArgumentException("SMTP Host is not configured.", nameof(_smtpSettings.Host));

            var smtpClient = new SmtpClient(_smtpSettings.Host, _smtpSettings.Port)
            {
                Credentials = new NetworkCredential(_smtpSettings.UserName, _smtpSettings.Password),
                EnableSsl = _smtpSettings.EnableSsl
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_smtpSettings.UserName),
                Subject = subject,
                Body = message,
                IsBodyHtml = true
            };

            mailMessage.To.Add(email);

            await smtpClient.SendMailAsync(mailMessage);
        }

    }

}

