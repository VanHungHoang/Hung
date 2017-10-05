using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server
{
    public class Attendee
    {
        public int ID { get; set; }
        public int MeetingID { get; set; }
        public int AttendeeID { get; set; }
        public short TypeID { get; set; }
        public short ResponseID { get; set; }
    }
}
