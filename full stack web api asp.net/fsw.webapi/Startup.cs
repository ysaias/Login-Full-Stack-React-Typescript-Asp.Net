using fsw.webapi.Repositorios;
using Microsoft.EntityFrameworkCore;

namespace fsw.webapi
{
    public class Startup
    {

        public IConfiguration Configuration { get; }
        
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddDbContext<AppDbContext>(options => 
                options.UseSqlServer(Configuration.GetConnectionString("defaultConnection")),
                ServiceLifetime.Transient
            );

            services.AddCors(options => {
                var frontend = Configuration.GetValue<string>("urlFrontend");
                options.AddDefaultPolicy(builder =>
                {
                    builder
                       .WithOrigins(frontend)
                       .AllowAnyMethod()
                       .AllowAnyHeader();

                } );

            });
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

        }

        public void ConfigureApplication(IApplicationBuilder app, IWebHostEnvironment env) {

            // Configure the HTTP request pipeline.
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {

                endpoints.MapControllers();
            });
        }

    }
}
