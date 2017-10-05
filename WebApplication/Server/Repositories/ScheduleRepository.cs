using Euroland.NetCore.ToolsFramework.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server.Repositories
{
    public class ScheduleRepository : RepositoryBase, IScheduleRepository
    {
        public ScheduleRepository(IDatabaseContext dbContext) : base(dbContext)
        {

        }

        public List<Schedule> GetSchedule(string companyCode, DateTime startDate, DateTime endDate)
        {
            return this.DbContext.Exec<Schedule>("spScheduleSelectByDate", new { companyCode, startDate, endDate }).ToList();
        }
    }
}
