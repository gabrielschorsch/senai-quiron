using System;
using System.Collections.Generic;

namespace Senai.Quiron.WebApi.Domains
{
    public partial class Doutores
    {
        public Doutores()
        {
            Pacientes = new HashSet<Pacientes>();
        }

        public int IdDoutor { get; set; }
        public string Nome { get; set; }
        public string Crm { get; set; }
        public string CrmUf { get; set; }

        public ICollection<Pacientes> Pacientes { get; set; }
    }
}
