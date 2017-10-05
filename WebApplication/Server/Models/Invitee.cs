using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server
{
    public class Invitee
    {
        public int ID { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public int PositionID { get; set; }
    }
}
