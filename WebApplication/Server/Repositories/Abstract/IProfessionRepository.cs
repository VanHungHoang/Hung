﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server.Repositories
{
    public interface IProfessionRepository
    {
        List<Profession> SelectAllProfession();
    }
}
