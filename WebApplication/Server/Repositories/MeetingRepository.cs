using Euroland.NetCore.ToolsFramework.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server.Repositories
{
    public class MeetingRepository : RepositoryBase, IMeetingRepository
    {
        public MeetingRepository(IDatabaseContext dbContext) : base(dbContext)
        {

        }

        public int InsertMeeting(Meeting meeting)
        {
            
            throw new NotImplementedException();
        }
    }
}
