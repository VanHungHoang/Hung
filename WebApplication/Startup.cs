using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Euroland.NetCore.IRMeetingRequest.Server;
using Euroland.NetCore.IRMeetingRequest.Server.Extensions;
using Microsoft.Extensions.Logging;
using Euroland.NetCore.ToolsFramework.Data;

namespace Euroland.NetCore.IRMeetingRequest
{
    public class Startup
    {
        // Order or run
        //1) Constructor
        //2) Configure services
        //3) Configure

        private IHostingEnvironment _env;
        public Startup(IHostingEnvironment env)
        {
            Helpers.SetupSerilog();

            var builder = new ConfigurationBuilder()
                           .SetBasePath(env.ContentRootPath)
                           .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                           .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                           .AddEnvironmentVariables();
            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                //builder.AddUserSecrets<Startup>();
            }
            _env = env;
            Configuration = builder.Build();
        }

        public static IConfigurationRoot Configuration { get; set; }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            //if (_hostingEnv.IsDevelopment())
            //{
            //    services.AddSslCertificate(_hostingEnv);
            //}
            services.AddOptions();
            
            services.AddResponseCompression(options =>
            {
                options.MimeTypes = Helpers.DefaultMimeTypes;
            });


            services.AddMemoryCache();
            services.AddSingleton<IDatabaseContext>(new DapperDatabaseContext(Configuration["Data:SqlServerConnectionString"]));
            services.RegisterCustomServices();

            services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");

            services.AddEurolandServicesAll(_env, Configuration["Data:SharkDbConnectionString"]);
            services.AddCustomizedMvc();
        }
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.AddDevMiddlewares();

            if (env.IsProduction())
            {
                app.UseResponseCompression();
            }

            //app.UseXsrf();

            app.UseStaticFiles();

            app.UseEurolandApplicationBuilders();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
