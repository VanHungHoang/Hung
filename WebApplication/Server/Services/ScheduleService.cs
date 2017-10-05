using Euroland.NetCore.IRMeetingRequest.Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server.Services
{
    public class ScheduleService
    {
        private readonly IScheduleRepository _scheduleRepo;
        public ScheduleService(IScheduleRepository scheduleRepository)
        {
            _scheduleRepo = scheduleRepository;
        }

        public List<Schedule> GetListOfSchedules(string Ccode, DateTime startDate, DateTime EndDate)
        {
            return _scheduleRepo.GetSchedule(Ccode, startDate, EndDate);
        }
    }
}
