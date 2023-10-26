
using BlogPessoal.Data;
using BlogPessoal.Model;
using BlogPessoal.Security.Implements;
using BlogPessoal.Security;
using BlogPessoal.Service;
using BlogPessoal.Service.Implements;
using BlogPessoal.Validator;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BlogPessoal.Configuration;
using MicroElements.Swashbuckle.FluentValidation.AspNetCore;
using Microsoft.OpenApi.Models;

namespace BlogPessoal
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers()
                .AddNewtonsoftJson(
                    options => { 
                        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                        options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
                    }
                );

            //Conex�o com o Banco de Dados
            if (builder.Configuration["Enviroment:Start"].Equals("PROD"))
            {
                builder.Configuration.SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("secrets.json");
                var connectionString = builder.Configuration.GetConnectionString("ProdConnection");
                builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(connectionString)
            );
            }
            else
            {
                var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

                builder.Services.AddDbContext<AppDbContext>(options =>
                    options.UseSqlServer(connectionString)
                );

            }

            //Registar a Valida��o das Entidades
            builder.Services.AddTransient<IValidator<Postagem>, PostagemValidator>();
            builder.Services.AddTransient<IValidator<Tema>, TemaValidator>();
            builder.Services.AddTransient<IValidator<User>, UserValidator>();

            //Registrar as Classes de Servi�o
            builder.Services.AddScoped<IPostagemService, PostagemService>();
            builder.Services.AddScoped<ITemaService, TemaService>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddTransient<IAuthService, AuthService>();

            builder.Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                var Key = Encoding.UTF8.GetBytes(Settings.Secret);
                o.SaveToken = true;
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Key)
                };
            });

            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();


            builder.Services.AddSwaggerGen(options =>
            {

                //Personalizar a P�gna inicial do Swagger
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Projeto Blog Pessoal",
                    Description = "Projeto Blog Pessoal - ASP.NET Core 7 - Entity Framework",
                    Contact = new OpenApiContact
                    {
                        Name = "Robson Alves Rocha",
                        Email = "robsonrocha.dev@gmail.com",
                        Url = new Uri("https://biolink.website/RobsonRocha")
                    },
                    License = new OpenApiLicense
                    {
                        Name = "Github",
                        Url = new Uri("https://github.com/robson-it")
                    }
                });

                //Adicionar a Seguran�a no Swagger
                options.AddSecurityDefinition("JWT", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Digite um Token JWT v�lido!",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });

                //Adicionar a configura��o visual da Seguran�a no Swagger
                options.OperationFilter<AuthResponsesOperationFilter>();

            });

            // Adicionar o Fluent Validation no Swagger
            builder.Services.AddFluentValidationRulesToSwagger();

            //Configura��o do CORS
            builder.Services.AddCors(options => {
                options.AddPolicy(name: "MyPolicy", policy => { policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader(); });
            });

            var app = builder.Build();

            //Criar o Banco de Dados e as Tabelas
            using (var scope = app.Services.CreateAsyncScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                dbContext.Database.EnsureCreated();
            }

            // Configure the HTTP request pipeline.
            
                app.UseSwagger();

            if (app.Environment.IsProduction())
            {
                app.UseSwaggerUI(
                        options =>
                        {
                            options.SwaggerEndpoint("/swagger/v1/swagger.json", "Blog Pessoal - V1");
                            options.RoutePrefix = string.Empty; 
                        }
                    );
            }
                app.UseSwaggerUI();
            

            //Inicializa o CORS (MyPolicy)
            app.UseCors("MyPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}