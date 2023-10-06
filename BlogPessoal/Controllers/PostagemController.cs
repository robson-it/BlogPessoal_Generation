
using BlogPessoal.Model;
using BlogPessoal.Service;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace BlogPessoal.Controllers
{
    [Authorize]
    [Route("~/Postagens")]
    [ApiController]
    public class PostagemController : ControllerBase
    {
        private readonly IPostagemService _postagemService;
        private readonly IValidator<Postagem> _postagemValdidator;

        public PostagemController(IPostagemService postagemService, IValidator<Postagem> postagemValdidator)
        {
            _postagemService = postagemService;
            _postagemValdidator = postagemValdidator;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            return Ok(await _postagemService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(long id)
        {
            var Resposta = await _postagemService.GetById(id);
            if (Resposta is not null)
            {  
                return Ok(Resposta);
            }
            else
            {
                return NotFound();
            }
            
        }

        [HttpGet("titulo/{titulo}")]
        public async Task<ActionResult> GetByTitulo(string titulo)
        {
            return Ok(await _postagemService.GetByTitulo(titulo));
        }

        [HttpPost]
        public async Task<ActionResult> Create ([FromBody] Postagem postagem)
        {
            var ValidarPostagem  = await _postagemValdidator.ValidateAsync(postagem);
            if (!ValidarPostagem.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ValidarPostagem);
            }
            var resposta = await _postagemService.Create(postagem);

            if(resposta is null)
            {
                return BadRequest("Tema não encontrado!");
            }

            return CreatedAtAction(nameof(GetById), new { id = postagem.Id}, postagem);
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] Postagem postagem)
        {
            if (postagem.Id == 0)
            {
                return BadRequest("O Id da postagem é inválido");
            }

            var ValidarPostagem = await _postagemValdidator.ValidateAsync(postagem);
            if (!ValidarPostagem.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ValidarPostagem);
            }

            var Resposta = await _postagemService.Update(postagem);
            
            if(Resposta is null)
            {
                return NotFound("Postagem e/ou tema não encontrado(s)!");
            }

            return Ok(Resposta);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {

            var BuscaPostagem = await _postagemService.GetById(id);
            if (BuscaPostagem is null)
            {
                return NotFound("A postagem não foi encontrada!");
            }

            await _postagemService.Delete(BuscaPostagem);
            return NoContent();

        }


    }
}
