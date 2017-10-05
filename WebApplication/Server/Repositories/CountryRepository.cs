using Euroland.NetCore.ToolsFramework.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server.Repositories
{
    public class CountryRepository : RepositoryBase, ICountryRepository
    {
        public CountryRepository(IDatabaseContext dbContext) : base(dbContext)
        {

        }

        public List<Country> SelectAllCountry()
        {
            return DbContext.Exec<Country>("spCountrySelect").ToList();
        }
    }
}
