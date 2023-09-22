
using BlogPessoal.Model;
using BlogPessoal.Service;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;


namespace BlogPessoal.Controllers
{
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
    }
}
