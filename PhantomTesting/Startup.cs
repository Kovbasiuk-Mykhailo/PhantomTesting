using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace PhantomTesting
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", false, true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
            services.AddNodeServices();
            services.AddMemoryCache();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IMemoryCache cache, INodeServices nodeServices)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    "default",
                    "{controller=Home}/{action=Index}/{id?}");
            });

            WriteTestScriptsToCache(cache, nodeServices);
        }

        private static void WriteTestScriptsToCache(IMemoryCache cache, INodeServices nodeServices)
        {
            var entryOptions = new MemoryCacheEntryOptions().SetPriority(CacheItemPriority.NeverRemove);
            var result = JObject.Parse(nodeServices.InvokeAsync<string>("NodeScripts/ReadScripts.js").GetAwaiter().GetResult());
            var scripts = result["scripts"];
            var dictObj = scripts.ToObject<Dictionary<string, string>>();
            dictObj.Remove("test");
            cache.Set("scripts", dictObj, entryOptions);
        }
    }
}
