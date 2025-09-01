using BE_API.Data;
using BE_API.Middleware;
using BE_API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Kết nối DB
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Thêm CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:3001")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// Đọc cấu hình ApiToken từ appsettings.json
builder.Services.Configure<ApiTokenOptions>(builder.Configuration.GetSection("ApiToken"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
builder.Services.AddTransient<EmailService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Áp dụng CORS trước Authorization
app.UseCors("AllowFrontend");

// ✅ Thêm middleware kiểm tra token
app.UseApiToken();

app.UseAuthorization();

app.MapControllers();

app.Run();
