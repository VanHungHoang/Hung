using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server
{
    public class Schedule
    {
        public int ID { get; set; }
        public string CompanyCode { get; set; }
        public DateTime StartTime { get; set; }
        public int Duration { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsAvailable { get; set; }
    }
}
