using Euroland.NetCore.IRMeetingRequest.Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server.Services
{
    public class ProfessionService
    {
        private readonly IProfessionRepository _professionRepository;
        public ProfessionService(IProfessionRepository professionRepository)
        {
            _professionRepository = professionRepository;
        }

        public List<Profession> SelectAllProfession()
        {
            return _professionRepository.SelectAllProfession();
        }
    }
}
