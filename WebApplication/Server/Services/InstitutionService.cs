using Euroland.NetCore.IRMeetingRequest.Server.Repositories;
using System.Collections.Generic;

namespace Euroland.NetCore.IRMeetingRequest.Server.Services
{
    public class InstitutionService
    {
        private readonly IInstitutionRepository _institutionRepository;

        public InstitutionService(IInstitutionRepository institutionRepository)
        {
            _institutionRepository = institutionRepository;
        }

        public List<Institution> SelectAllInstitution()
        {
            return _institutionRepository.SelectAllInstitution();
        }
    }
}
