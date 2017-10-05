using Euroland.NetCore.IRMeetingRequest.Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server.Services
{
    public class CountryService
    {
        private readonly ICountryRepository _countryRepository;

        public CountryService(ICountryRepository countryRepository)
        {
            _countryRepository = countryRepository;
        }

        public List<Country> SelectAllCountry()
        {
            return _countryRepository.SelectAllCountry();
        }
    }
}
