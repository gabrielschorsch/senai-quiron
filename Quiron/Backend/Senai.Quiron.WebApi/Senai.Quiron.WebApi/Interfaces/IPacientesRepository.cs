using Senai.Quiron.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Quiron.WebApi.Interfaces {
    public interface IPacientesRepository {
        List<Pacientes> ListarPacientes();
        Pacientes BuscarPacientePorId (int id);
        void CadastrarPaciente(Pacientes paciente);
        void AtualizarPaciente(int idPaciente , Pacientes paciente);
        void RemoverPaciente (int idPaciente);
    }
}
