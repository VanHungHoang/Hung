using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server
{
    public class MeetingAttachment
    {
        public int ID { get; set; }
        public int MeetingID { get; set; }
        public string FileName { get; set; }
        public string FileLocation { get; set; }
    }
}
