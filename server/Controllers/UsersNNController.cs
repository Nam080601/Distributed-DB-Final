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
    public class UsersNNController : ControllerBase
    {
        private readonly UserNNContext _context;

        public UsersNNController(UserNNContext context)
        {
            _context = context;
        }

        // POST: api/users/register
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<User>> PostRegister(User user)
        {
            if (_context.UserNN == null)
            {
                return Problem("Entity set 'UserContext.User'  is null.");
            }
            user.password = BCrypt.Net.BCrypt.HashPassword(user.password);
            _context.UserNN.Add(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.username))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return CreatedAtAction("PostRegister", new { id = user.username }, user);
        }

        // GET: api/UsersNN
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUserNN()
        {
          if (_context.UserNN == null)
          {
              return NotFound();
          }
            return await _context.UserNN.ToListAsync();
        }

        // GET: api/UsersNN/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
          if (_context.UserNN == null)
          {
              return NotFound();
          }
            var user = await _context.UserNN.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/UsersNN/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, User user)
        {
            if (id != user.username)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UsersNN
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
          if (_context.UserNN == null)
          {
              return Problem("Entity set 'UserNNContext.UserNN'  is null.");
          }
            _context.UserNN.Add(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.username))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { id = user.username }, user);
        }

        // DELETE: api/UsersNN/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if (_context.UserNN == null)
            {
                return NotFound();
            }
            var user = await _context.UserNN.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.UserNN.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(string id)
        {
            return (_context.UserNN?.Any(e => e.username == id)).GetValueOrDefault();
        }
    }
}
