﻿using BlogPessoal.Model;

namespace BlogPessoal.Service
{
    public interface IPostagemService
    {
        Task<IEnumerable<Postagem>> GetAll();
        Task<Postagem?> GetById(long id);
        Task<IEnumerable<Postagem>> GetByTitulo (string titulo);
        Task<Postagem?> Create(Postagem postagem);
        Task Delete (Postagem postagem);


    }
}
