using Senai.Quiron.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Quiron.WebApi.Interfaces {
    public interface IDoutoresRepository {
        List<Doutores> ListarDoutores ();
        Doutores BuscarDoutorPorId (int id);
        void CadastrarDoutor (Doutores doutor);
        void AtualizarDoutor (int idDoutor , Doutores novoDoutor);
        void RemoverDoutor (int idDoutor);
    }
}
