using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserContext _context;

        public UsersController(UserContext context)
        {
            _context = context;
        }

        // POST: api/users/login
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<User>> PostLogin(User user)
        {
            var getUser = await _context.User.FirstOrDefaultAsync(p => p.username == user.username);
            if (getUser == null)
            {
                return NotFound();
            }
            else
            {
                bool verified = BCrypt.Net.BCrypt.Verify(user.password, getUser.password);
                if (verified)
                {
                    return Ok(new { getUser.hoten, getUser.khoa, getUser.vaitro });
                }
                else
                {
                    return Unauthorized();
                }
            }
        }

        private bool UserExists(string id)
        {
            return (_context.User?.Any(e => e.username == id)).GetValueOrDefault();
        }        
    }
}
