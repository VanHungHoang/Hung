using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server
{
    public interface IMeeting
    {
        int ID { get; set; }
        int ScheduleID { get; set; }
    }
}
