using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server
{
    public class Meeting : IMeeting
    {
        public int ID { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public int ScheduleID { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public int HostID { get; set; }
        public int LanguageID { get; set; }
        public short MeetingTypeID { get; set; }
        public short StatusID { get; set; }
        public string Agenda { get; set; }
    }
}
