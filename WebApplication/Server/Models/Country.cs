using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server
{
    public interface ICountry
    {
        int ID { get; set; }
        string Name { get; set; }
        short CountryCode { get; set; }
    }

    public class Country : ICountry
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int TranslationID { get; set; }
        public short CountryCode { get; set; }
    }
}
