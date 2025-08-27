using Microsoft.Extensions.Options;
using System.Text.Json;

namespace BE_API.Middleware
{
    // Lớp để đọc cấu hình từ appsettings.json
    public class ApiTokenOptions
    {
        public string ValidToken { get; set; } = "";
        public string QueryName { get; set; } = "token";
    }

    public class ApiTokenMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ApiTokenOptions _options;

        public ApiTokenMiddleware(RequestDelegate next, IOptions<ApiTokenOptions> options)
        {
            _next = next;
            _options = options.Value;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Lấy token từ query string
            var token = context.Request.Query[_options.QueryName].ToString();

            if (string.IsNullOrEmpty(token))
            {
                await WriteError(context, StatusCodes.Status401Unauthorized, "Token is missing");
                return;
            }

            if (token != _options.ValidToken)
            {
                await WriteError(context, StatusCodes.Status403Forbidden, "Invalid token");
                return;
            }

            // Token hợp lệ -> cho phép request đi tiếp
            await _next(context);
        }

        private static async Task WriteError(HttpContext context, int status, string message)
        {
            context.Response.StatusCode = status;
            context.Response.ContentType = "application/json";
            var result = new { error = message, status, path = context.Request.Path };
            await context.Response.WriteAsync(JsonSerializer.Serialize(result));
        }
    }

    // Extension method để đăng ký middleware
    public static class ApiTokenMiddlewareExtensions
    {
        public static IApplicationBuilder UseApiToken(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ApiTokenMiddleware>();
        }
    }
}
