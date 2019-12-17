using System;
using System.Collections.Generic;

namespace Senai.Quiron.WebApi.Domains
{
    public partial class Pacientes
    {
        public int IdPaciente { get; set; }
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Cpf { get; set; }
        public int? IdDoutor { get; set; }

        public Doutores IdDoutorNavigation { get; set; }
    }
}
