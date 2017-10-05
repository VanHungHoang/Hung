using Euroland.NetCore.ToolsFramework.Data;
using System.Collections.Generic;
using System.Linq;

namespace Euroland.NetCore.IRMeetingRequest.Server.Repositories
{
    public class InstitutionRepository : RepositoryBase, IInstitutionRepository
    {
        public InstitutionRepository(IDatabaseContext dbContext) : base(dbContext)
        {

        }

        public List<Institution> SelectAllInstitution()
        {
            return DbContext.Exec<Institution>("spInstitutionSelect").ToList();
        }
    }
}
