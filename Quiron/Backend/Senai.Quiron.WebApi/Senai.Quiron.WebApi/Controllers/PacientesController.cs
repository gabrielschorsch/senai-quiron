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
    public class PacientesController : ControllerBase {

        IPacientesRepository pacientesRepository;

        public PacientesController () {
            pacientesRepository = new PacientesRepository();
        }


        [HttpGet]
        public IEnumerable<Pacientes> Listar () {
            return pacientesRepository.ListarPacientes();
        }

        [HttpGet("{id}")]
        public IActionResult BuscarPorId (int id) {
            try {
                return Ok(pacientesRepository.BuscarPacientePorId(id));
            } catch (Exception e) {
                return BadRequest(new { mensagem = e.Message });
            }
        }

        [HttpPost]
        public IActionResult Cadastrar (Pacientes paciente) {
            try {
                pacientesRepository.CadastrarPaciente(paciente);
                return Ok(new { mensagem = "Paciente cadastrado com sucesso!" });
            } catch (Exception e) {
                return BadRequest(new { mensagem = e.Message });
            }
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar (int idPaciente,Pacientes paciente) {
            try {
                pacientesRepository.AtualizarPaciente(idPaciente,paciente);
                return Ok(new { mensagem = "Paciente atualizado com sucesso!" });
            } catch (Exception e) {
                return BadRequest(new { mensagem = e.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Remover (int idPaciente) {
            try {
                pacientesRepository.RemoverPaciente(idPaciente);
                return Ok(new { mensagem = "Paciente removido com sucesso!" });
            } catch (Exception e) {
                return BadRequest(new { mensagem = e.Message });
            }
        }
    }
}