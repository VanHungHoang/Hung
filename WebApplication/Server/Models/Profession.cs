using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server
{
    public interface IProfession
    {
        int ID { get; set; }
        string Name { get; set; }
    }

    public class Profession : IProfession
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int TranslationID { get; set; }
    }
}
