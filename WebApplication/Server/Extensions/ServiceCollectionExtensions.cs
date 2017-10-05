using Euroland.NetCore.IRMeetingRequest.Server.Filters;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Http;
using Euroland.NetCore.IRMeetingRequest.Server.Services;
using Euroland.NetCore.IRMeetingRequest.Server.Repositories;

namespace Euroland.NetCore.IRMeetingRequest.Server.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSslCertificate(this IServiceCollection services, IHostingEnvironment hostingEnv)
        {
            //var cert = new X509Certificate2(Path.Combine(hostingEnv.ContentRootPath, "extra", "cert.pfx"), "game123");

            //services.Configure<KestrelServerOptions>(options =>
            //{
            //    options.UseHttps(cert);

            //});

            return services;
        }
        public static IServiceCollection AddCustomizedMvc(this IServiceCollection services)
        {
            services.AddMvc(options =>
            {
                options.Filters.Add(typeof(ModelValidationFilter));
            })
            .AddJsonOptions(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            return services;
        }
        public static IServiceCollection AddCustomIdentity(this IServiceCollection services)
        {

            return services;
        }
        public static IServiceCollection AddCustomOpenIddict(this IServiceCollection services)
        {


            return services;
        }
        public static IServiceCollection AddCustomDbContext(this IServiceCollection services)
        {
            
            return services;
        }
        public static IServiceCollection RegisterCustomServices(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            
            services.AddScoped<ApiExceptionFilter>();
            services.AddScoped<AppSettings, AppSettings>();
            services.AddScoped<ICountryRepository, CountryRepository>();
            services.AddScoped<CountryService, CountryService>();
            services.AddScoped<IProfessionRepository, ProfessionRepository>();
            services.AddScoped<ProfessionService, ProfessionService>();
            services.AddScoped<IInstitutionRepository, InstitutionRepository>();
            services.AddScoped<InstitutionService, InstitutionService>();
            services.AddScoped<IScheduleRepository, ScheduleRepository>();
            services.AddScoped<ScheduleService, ScheduleService>();
            return services;
        }
    }
}
