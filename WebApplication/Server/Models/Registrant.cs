using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server
{
    public class Registrant
    {
        public int ID { get; set; }
        public string CompanyCode { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public short ProfessionID { get; set; }
        public string Mobile { get; set; }
        public string Company { get; set; }
        public int InstitutionTypeID { get; set; }
        public string CompanyTelephone { get; set; }
        public string City { get; set; }
        public int CountryID { get; set; }
        public string CountryCode { get; set; }
    }
}
