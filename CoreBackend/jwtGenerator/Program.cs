// See https://aka.ms/new-console-template for more information
using System.Security.Cryptography;

var key = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));

// Output the generated key
Console.WriteLine("Generated Key: " + key);
