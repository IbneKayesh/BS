using Microsoft.AspNetCore.Cors.Infrastructure;

namespace ap.api.Services
{
    public static class CorsPolicyExtension
    {
        public static IServiceCollection AddCorsPolicy(this IServiceCollection services, IConfiguration configuration)
        {
            var allowedOrigins = configuration.GetSection("AllowedOrigins").Get<string[]>();

            // Step 1: Configure CORS to read from appsettings.json
            services.Configure<CorsOptions>(options =>
            {
                if (allowedOrigins != null && allowedOrigins.Any())
                {
                    options.AddPolicy("AllowSpecificOrigins", policy =>
                    {
                        policy.WithOrigins(allowedOrigins)  // Add allowed origins from appsettings.json
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
                }
            });

            services.AddCors(options =>
             {
                 options.AddPolicy("AllowSpecificOrigins", policy =>
                 {
                     policy.WithOrigins(allowedOrigins)
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                 });
             });

            return services;
        }
    }
}
