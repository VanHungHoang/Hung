using System.Collections.Generic;
using System.Linq;
using Serilog;
using Serilog.Events;
using static Microsoft.AspNetCore.ResponseCompression.ResponseCompressionDefaults;

namespace Euroland.NetCore.IRMeetingRequest.Server
{
    public static class Helpers
    {
        public static void SetupSerilog()
        {
            // Configure Serilog
            Log.Logger = new LoggerConfiguration()
            .MinimumLevel
            .Information()
            .WriteTo.RollingFile("logs/log-{Date}.txt", LogEventLevel.Information) // Uncomment if logging required on text file
            .WriteTo.Seq("http://localhost:5341/")
            .CreateLogger();
        }

        public static IEnumerable<string> DefaultMimeTypes => MimeTypes.Concat(new[]
                                {
                                    "image/svg+xml",
                                    "application/font-woff2"
                                });

        public static string CompanyCode
        {
            get
            {
                string companyCode = "test";
                // get company code from url
                // if it existed then we neet to assign to company code variable
                return companyCode;
            }
        }
    }
}