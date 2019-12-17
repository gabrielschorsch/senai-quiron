using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.Quiron.WebApi.Domains;
using Senai.Quiron.WebApi.Interfaces;
using Senai.Quiron.WebApi.Repositories;

namespace Senai.Quiron.WebApi.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class DoutoresController : ControllerBase {

        IDoutoresRepository doutoresRepository;

        public DoutoresController () {
            doutoresRepository = new DoutoresRepository();
        }

        [HttpGet("{id}")]
        public IActionResult BuscarPorId (int id) {
            try {
                return Ok(doutoresRepository.BuscarDoutorPorId(id));
            } catch (Exception e) {
                return BadRequest(new { mensagem = e.Message });
            }
        }


        [HttpGet]
        public IEnumerable<Doutores> Listar () {
            return doutoresRepository.ListarDoutores();
        }

        [HttpPost]
        public IActionResult Cadastrar (Doutores Doutor) {
            try {
                doutoresRepository.CadastrarDoutor(Doutor);
                return Ok(new { mensagem = "Doutor cadastrado com sucesso!" });
            } catch (Exception e) {
                return BadRequest(new { mensagem = e.Message });
            }
        }

        [HttpPut("{idDoutor}")]
        public IActionResult Atualizar (int idDoutor,Doutores doutor) {
            try {
                doutoresRepository.AtualizarDoutor(idDoutor, doutor);
                return Ok(new { mensagem = "Doutor atualizado com sucesso!" });
            } catch (Exception e) {
                return BadRequest(new { mensagem = e.Message });
            }
        }

        [HttpDelete("{idDoutor}")]
        public IActionResult Remover (int idDoutor) {
            try {
                doutoresRepository.RemoverDoutor(idDoutor);
                return Ok(new { mensagem = "Doutor removido com sucesso!" });
            } catch (Exception e) {
                return BadRequest(new { mensagem = e.Message });
            }
        }
    }
}