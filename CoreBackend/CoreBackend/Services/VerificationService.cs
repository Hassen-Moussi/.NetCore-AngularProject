namespace CoreBackend.Services
{

    public interface IVerificationService
    {
        string GenerateVerificationCode(string key);
        bool ValidateVerificationCode(string key, string code);
        void RemoveVerificationCode(string key);
    }
    public class VerificationService : IVerificationService
    {
        private readonly Dictionary<string, string> _verificationCodes = new();




        public string GenerateVerificationCode(string key)
        {
            var code = Guid.NewGuid().ToString().Substring(0, 6); // Example: "123456"
            _verificationCodes[key] = code;
            return code;
        }

        public bool ValidateVerificationCode(string key, string code)
        {
            Console.WriteLine($"Validating code for {key} with input code: {code}");  // Log the key and code being validated
            if (_verificationCodes.TryGetValue(key, out var storedCode))
            {
                Console.WriteLine($"Stored code for {key}: {storedCode}");  // Log the stored code
                if (storedCode == code)
                {
                    Console.WriteLine("Verification successful.");
                    return true;
                }
            }

            Console.WriteLine($"No verification code found for {key} or code mismatch.");
            return false;
        }



        public void RemoveVerificationCode(string key)
        {
            _verificationCodes.Remove(key);
        }
    }
}
