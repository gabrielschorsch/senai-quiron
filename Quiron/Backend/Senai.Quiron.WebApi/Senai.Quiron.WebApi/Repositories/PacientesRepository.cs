using Microsoft.EntityFrameworkCore;
using Senai.Quiron.WebApi.Domains;
using Senai.Quiron.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Quiron.WebApi.Repositories {
    public class PacientesRepository : IPacientesRepository {
        public void AtualizarPaciente (int idPaciente , Pacientes paciente) {
            using (QuironContext ctx = new QuironContext()) {

                var novoPaciente = ctx.Pacientes.Find(idPaciente);

                novoPaciente.Nome = paciente.Nome;
                novoPaciente.Cpf = paciente.Cpf;
                novoPaciente.DataNascimento = paciente.DataNascimento;

                ctx.Pacientes.Update(novoPaciente);
                ctx.SaveChanges();
            }
        }

        public Pacientes BuscarPacientePorId (int id) {
            using (QuironContext ctx = new QuironContext()) {
                return ctx.Pacientes.Include(x => x.IdDoutorNavigation).FirstOrDefault(x => x.IdPaciente == id);
            }
        }

        public void CadastrarPaciente (Pacientes paciente) {
            using (QuironContext ctx = new QuironContext()) {
                ctx.Pacientes.Add(paciente);
                ctx.SaveChanges();
            }
        }

        public List<Pacientes> ListarPacientes () {
            using (QuironContext ctx = new QuironContext()) {
                return ctx.Pacientes.Include(x => x.IdDoutorNavigation).ToList();
            }
        }

        public void RemoverPaciente (int idPaciente) {
            using (QuironContext ctx = new QuironContext()) {
                ctx.Pacientes.Remove(ctx.Pacientes.Find(idPaciente));
                ctx.SaveChanges();
            }
        }
        }
}
