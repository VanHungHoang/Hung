using Euroland.NetCore.ToolsFramework.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server.Repositories
{
    public class ProfessionRepository : RepositoryBase, IProfessionRepository
    {
        public ProfessionRepository(IDatabaseContext dbContext) : base(dbContext)
        {

        }

        public List<Profession> SelectAllProfession()
        {
            return DbContext.Exec<Profession>("spProfessionSelect").ToList();
        }
    }
}
