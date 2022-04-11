using Microsoft.EntityFrameworkCore;
using server.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<FacultyContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("FacultyContext")));
    
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}   

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();