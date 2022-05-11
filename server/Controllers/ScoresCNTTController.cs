#nullable disable
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
    public class ScoresCNTTController : ControllerBase
    {
        private readonly ScoreCNTTContext _context;

        public ScoresCNTTController(ScoreCNTTContext context)
        {
            _context = context;
        }

        // GET: api/ScoresCNTT
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Score>>> GetScoreCNTT()
        {
            return await _context.ScoreCNTT.ToListAsync();
        }

        // GET: api/ScoresCNTT/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Score>> GetScore(string id)
        {
            var score = await _context.ScoreCNTT.FindAsync(id);

            if (score == null)
            {
                return NotFound();
            }

            return score;
        }

        // PUT: api/ScoresCNTT/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutScore(string id, Score score)
        {
            if (id != score.MSSV)
            {
                return BadRequest();
            }

            _context.Entry(score).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScoreExists(id))
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

        // POST: api/ScoresCNTT
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Score>> PostScore(Score score)
        {
            _context.ScoreCNTT.Add(score);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ScoreExists(score.MSSV))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetScore", new { id = score.MSSV }, score);
        }

        // DELETE: api/ScoresCNTT/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScore(string id)
        {
            var score = await _context.ScoreCNTT.FindAsync(id);
            if (score == null)
            {
                return NotFound();
            }

            _context.ScoreCNTT.Remove(score);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ScoreExists(string id)
        {
            return _context.ScoreCNTT.Any(e => e.MSSV == id);
        }
    }
}
