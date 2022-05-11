using Microsoft.EntityFrameworkCore;
using server.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Users
builder.Services.AddDbContext<UserContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("base")));
// Scores
builder.Services.AddDbContext<ScoreContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("base")));
// Students
builder.Services.AddDbContext<StudentContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("base")));
// Score CNTT
builder.Services.AddDbContext<ScoreCNTTContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("UserCNTT")));
// Score NN
builder.Services.AddDbContext<ScoreNNContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("UserNN")));
// Users CNTT
builder.Services.AddDbContext<UserCNTTContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("KhoaCNTT")));
// Users NN
builder.Services.AddDbContext<UserNNContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("KhoaNN")));
// Students CNTT
builder.Services.AddDbContext<StudentCNTTContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("KhoaCNTT")));
// Students NN
builder.Services.AddDbContext<StudentNNContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("KhoaNN")));

// Enable cors
builder.Services.AddCors(p => p.AddPolicy("cors", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.Urls.Add("http://127.0.0.1:5000");
app.Urls.Add("http://192.168.1.100:5000");

app.UseCors("cors");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();