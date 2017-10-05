using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Euroland.NetCore.ToolsFramework.Mvc.Localization;
using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;
using System.Reflection;
using Euroland.NetCore.ToolsFramework.Setting.Abstractions;
using System.Collections.ObjectModel;
using Euroland.NetCore.IRMeetingRequest.Server;
using Euroland.NetCore.IRMeetingRequest.Server.Services;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Euroland.NetCore.IRMeetingRequest.Server.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment _env;
        private readonly ITranslation _translation;
        private readonly AppSettings _setting;
        private readonly CountryService _countryService;
        private readonly ProfessionService _professionService;
        private readonly InstitutionService _institutionService;
        private readonly ScheduleService _scheduleService;

        public HomeController(IHostingEnvironment env, ITranslation tranlsation, AppSettings setting, CountryService countryService, ProfessionService professionService, InstitutionService institutionService,
            ScheduleService scheduleService)
        {
            _env = env ?? throw new ArgumentNullException(nameof(env));
            _translation = tranlsation ?? throw new ArgumentNullException(nameof(tranlsation));
            _setting = setting ?? throw new ArgumentNullException(nameof(setting));
            _countryService = countryService ?? throw new ArgumentNullException(nameof(countryService));
            _professionService = professionService ?? throw new ArgumentNullException(nameof(professionService));
            _institutionService = institutionService ?? throw new ArgumentNullException(nameof(institutionService));
            _scheduleService = scheduleService?? throw new ArgumentNullException(nameof(institutionService));
        }

        public JsonResult CalendarData()
        {
            List<Schedule> lstSchedule = _scheduleService.GetListOfSchedules("", new DateTime().AddMonths(-6), new DateTime());
            return Json(lstSchedule);
        }

        public async Task<IActionResult> Index()
        {
            ViewBag.MainDotJs = await GetMainDotJs();
            var a = _setting.SubscriberFields;
            /*
            var test = new Test()
            {
                Age = 34,
                Name = "Testing serialization",
                Phone = "0945669374",
                Address = "No. 74/1A, Pho Lua, Van Phuc, Ha Dong, Hanoi"
            };

            var setting = new Newtonsoft.Json.JsonSerializerSettings()
            {
                DateFormatHandling = Newtonsoft.Json.DateFormatHandling.IsoDateFormat,
                Formatting = Newtonsoft.Json.Formatting.Indented
                //ContractResolver =
            };
            string jsonString1 = CustomJsonConvert.SerializeObject(test);
            string jsonString2 = CustomJsonConvert.SerializeObject<MyInterface>(test);

            ViewBag.json1 = jsonString1;
            ViewBag.json2 = jsonString2;
            */

            //Get TimezoneList for Calendar
            ReadOnlyCollection<TimeZoneInfo> lstTimeZone = TimeZoneInfo.GetSystemTimeZones();
            String jsonTimeZone = CustomJsonConvert.SerializeObject(lstTimeZone.Select((s) => new { timeZoneID = s.StandardName, timeZoneName = s.DisplayName }));
            ViewBag.TimeZones = jsonTimeZone;

            List<Country> countries = _countryService.SelectAllCountry();
            ViewBag.Countries = CustomJsonConvert.SerializeObject<ICountry>(countries);

            List<Profession> professions = _professionService.SelectAllProfession();
            ViewBag.Professions = CustomJsonConvert.SerializeObject<IProfession>(professions);

            List<Institution> institutions = _institutionService.SelectAllInstitution();
            ViewBag.Institutions = CustomJsonConvert.SerializeObject<Institution>(institutions);

            return View();
        }

        // Becasue for production this is hashed chunk so has changes on each production build
        public async Task<string> GetMainDotJs()
        {
            var basePath = _env.WebRootPath + "//dist//";

            if (_env.IsDevelopment() && !System.IO.File.Exists(basePath + "frontendMain.js"))
            {
                // Just a .js request to make it wait to finish webpack dev middleware finish creating bundles:
                // More info here: https://github.com/aspnet/JavaScriptServices/issues/578#issuecomment-272039541
                using (var client = new HttpClient())
                {
                    var requestUri = Request.Scheme + "://" + Request.Host + "/dist/frontendMain.js";
                    await client.GetAsync(requestUri);
                }
            }

            var info = new System.IO.DirectoryInfo(basePath);
            var file = info.GetFiles()
                .Where(f => _env.IsDevelopment() ? f.Name == "frontendMain.js" : f.Name.StartsWith("frontendMain.") && !f.Name.EndsWith("bundle.map"));
            return file.FirstOrDefault().Name;
        }
    }

    public interface MyInterface
    {
        [JsonProperty(PropertyName = "hehe4")]
        string Name { get; set; }

        [JsonIgnore]
        int Age { get; set; }
    }

    public class Test : MyInterface
    {
        public string Name { get; set; } = "Binh";
        public int Age { get; set; } = 33;

        public string Phone { get; set; }

        public string Address { get; set; }
    }

    public class AbstractMemberTypeFilterContractResolver<TType> : Newtonsoft.Json.Serialization.DefaultContractResolver
    {
        private readonly IEnumerable<MemberInfo> _abstractClassMembers;
        public AbstractMemberTypeFilterContractResolver()
        {
            _abstractClassMembers = typeof(TType).GetProperties();
        }

        protected override List<MemberInfo> GetSerializableMembers(Type objectType)
        {
            var a = base.GetSerializableMembers(objectType);
            return a;
        }

        protected override IList<JsonProperty> CreateProperties(Type type, MemberSerialization memberSerialization)
        {
            if (_abstractClassMembers != null && _abstractClassMembers.Count() > 0)
            {
                return _abstractClassMembers.Select(memberInfo => this.CreateProperty(memberInfo, memberSerialization)).ToList();
            }
            else
            {
                return base.CreateProperties(type, memberSerialization);
            }
        }
    }

    public static class CustomJsonConvert
    {
        public static string SerializeObject<TType>(object value)
        {
            var setting = new Newtonsoft.Json.JsonSerializerSettings()
            {
                DateFormatHandling = Newtonsoft.Json.DateFormatHandling.IsoDateFormat,
                Formatting = Newtonsoft.Json.Formatting.Indented
            };

            if (value != null && typeof(TType).IsAssignableFrom(value.GetType()))
            {
                setting.ContractResolver = new AbstractMemberTypeFilterContractResolver<TType>();
            }

            return Newtonsoft.Json.JsonConvert.SerializeObject(value, setting);
        }
        public static string SerializeObject(object value)
        {
            var setting = new Newtonsoft.Json.JsonSerializerSettings()
            {
                DateFormatHandling = Newtonsoft.Json.DateFormatHandling.IsoDateFormat,
                Formatting = Newtonsoft.Json.Formatting.Indented
            };

            return Newtonsoft.Json.JsonConvert.SerializeObject(value, setting);
        }
    }
}


