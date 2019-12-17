using Microsoft.EntityFrameworkCore;
using Senai.Quiron.WebApi.Domains;
using Senai.Quiron.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Quiron.WebApi.Repositories {
    public class DoutoresRepository : IDoutoresRepository {
        public void AtualizarDoutor (int idDoutor , Doutores novoDoutor) {
            using (QuironContext ctx = new QuironContext()) {
                var doc = ctx.Doutores.Find(idDoutor);
                doc.Nome = novoDoutor.Nome;
                doc.Crm = novoDoutor.Crm;
                doc.CrmUf = novoDoutor.CrmUf;
                ctx.Update(doc);
                ctx.SaveChanges();
            }
        }

        public Doutores BuscarDoutorPorId (int id) {
            using (QuironContext ctx = new QuironContext()) {
                return ctx.Doutores.Find(id);
            }
        }

        public void CadastrarDoutor (Doutores doutor) {
            using (QuironContext ctx = new QuironContext()) {
                ctx.Doutores.Add(doutor);
                ctx.SaveChanges();
            }
        }

        public List<Doutores> ListarDoutores () {
            using (QuironContext ctx = new QuironContext()) {
                return ctx.Doutores.ToList();
            }
        }

        public void RemoverDoutor (int idDoutor) {
            using (QuironContext ctx = new QuironContext()) {
                ctx.Doutores.Remove(ctx.Doutores.Find(idDoutor));
                ctx.SaveChanges();
            }
        }
    }
}
