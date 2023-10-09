
using BlogPessoal.Model;
using BlogPessoal.Service;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace BlogPessoal.Controllers
{
    [Authorize]
    [Route("~/Temas")]
    [ApiController]
    public class TemaController : ControllerBase
    {
        private readonly ITemaService _temaService;
        private readonly IValidator<Tema> _temaValdidator;

        public TemaController(ITemaService temaService, IValidator<Tema> temaValdidator)
        {
            _temaService = temaService;
            _temaValdidator = temaValdidator;
        }

        [HttpGet("listasTodos")]
        public async Task<ActionResult> GetAll()
        {
            return Ok(await _temaService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(long id)
        {
            var Resposta = await _temaService.GetById(id);
            if (Resposta is not null)
            {  
                return Ok(Resposta);
            }
            else
            {
                return NotFound();
            }
            
        }

        [HttpGet("descricao/{descricao}")]
        public async Task<ActionResult> GetByDescricao(string descricao)
        {
            return Ok(await _temaService.GetByDescricao(descricao));
        }

        [HttpPost("cadastrar")]
        public async Task<ActionResult> Create ([FromBody] Tema tema)
        {
            var ValidarTema  = await _temaValdidator.ValidateAsync(tema);
            if (!ValidarTema.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ValidarTema);
            }
            await _temaService.Create(tema);
            return CreatedAtAction(nameof(GetById), new { id = tema.Id}, tema);
        }

        [HttpPut("atualizar")]
        public async Task<ActionResult> Update([FromBody] Tema tema)
        {
            if (tema.Id == 0)
            {
                return BadRequest("O Id da postagem é inválido");
            }

            var ValidarTema = await _temaValdidator.ValidateAsync(tema);
            if (!ValidarTema.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ValidarTema);
            }

            var Resposta = await _temaService.Update(tema);
            
            if(Resposta is null)
            {
                return NotFound("Postagem não encontrada!");
            }

            return Ok(Resposta);
        }

        [HttpDelete("deletar/{id}")]
        public async Task<IActionResult> Delete(long id)
        {

            var BuscaTema = await _temaService.GetById(id);
            if (BuscaTema is null)
            {
                return NotFound("A postagem não foi encontrada!");
            }

            await _temaService.Delete(BuscaTema);
            return NoContent();

        }


    }
}
