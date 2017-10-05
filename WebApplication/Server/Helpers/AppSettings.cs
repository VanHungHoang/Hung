using Euroland.NetCore.ToolsFramework.Setting.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroland.NetCore.IRMeetingRequest.Server
{
    public class AppSettings
    {
        private readonly ISettingItemRoot _setting;

        public AppSettings(ISettingItemRoot setting)
        {
            _setting = setting ?? throw new ArgumentNullException(nameof(setting));
        }        

        public List<string> AvailableLanguagesOnMeeting
        {
            get
            {
                List<string> availableLanguages = new List<string>();
                var settingAvailableLanguages = _setting.GetChild("AvailableLanguagesOnMeeting");
                if (settingAvailableLanguages != null)
                {
                    availableLanguages.AddRange(settingAvailableLanguages.Value.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries).ToList());
                }
                return availableLanguages;
            }
        }

        public string Timezone
        {
            get
            {
                string timeZone = string.Empty;
                var settingTimeZone = _setting.GetChild("Timezone");
                if (settingTimeZone != null)
                {
                    timeZone = settingTimeZone.Value;
                }
                return timeZone;
            }
        }

        public string DateFormat
        {
            get
            {
                string dateFormat = string.Empty;
                var settingDateFormat = _setting["Format:en-GB:DateFormat"];
                if (settingDateFormat != null)
                {

                }
                return dateFormat;
            }
        }

        public string TimeFormat
        {
            get
            {
                string timeFormat = string.Empty;
                var settingTimeFormat = _setting["Format:en-GB:TimeFormat"];
                if (settingTimeFormat != null)
                {

                }
                return timeFormat;
            }
        }

        public bool UseLatinNumbers
        {
            get
            {
                bool useLatinNumbers = false;
                var settingUseLatinNumbers = _setting.GetChild("UseLatinNumbers");
                if (settingUseLatinNumbers != null)
                {
                    bool.TryParse(settingUseLatinNumbers.Value, out useLatinNumbers);
                }
                return useLatinNumbers;
            }
        }

        public bool EnabledCompanyLogo
        {
            get
            {
                bool enabledCompanyLogo = false;
                var settingEnabledCompanyLogo = _setting.GetChild("EnabledCompanyLogo");
                if (settingEnabledCompanyLogo != null)
                {
                    bool.TryParse(settingEnabledCompanyLogo.Value, out enabledCompanyLogo);
                }
                return enabledCompanyLogo;
            }
        }

        public bool NewRequestNotification
        {
            get
            {
                bool isNewRequestNotification = false;
                var settingNewRequestNotification = _setting.GetChild("NewRequestNotification");
                if (settingNewRequestNotification != null)
                {
                    bool.TryParse(settingNewRequestNotification.Value, out isNewRequestNotification);
                }
                return isNewRequestNotification;
            }
        }

        public bool NewRequestNotificationReceipient
        {
            get
            {
                bool isNewRequestNotificationReceipient = false;
                var settingNewRequestNotificationReceipient = _setting.GetChild("NewRequestNotificationReceipient");
                if (settingNewRequestNotificationReceipient != null)
                {
                    bool.TryParse(settingNewRequestNotificationReceipient.Value, out isNewRequestNotificationReceipient);
                }
                return isNewRequestNotificationReceipient;
            }
        }

        public bool SendMeetingReminder
        {
            get
            {
                bool isSendMeetingReminder = false;
                var settingSendMeetingReminder = _setting.GetChild("SendMeetingReminder");
                if (settingSendMeetingReminder != null)
                {
                    bool.TryParse(settingSendMeetingReminder.Value, out isSendMeetingReminder);
                }
                return isSendMeetingReminder;
            }
        }

        public bool AllowMultipleSchedules
        {
            get
            {
                bool allowMultipleSchedules = false;
                var settingAllowMultipleSchedules = _setting.GetChild("AllowMultipleSchedules");
                if (settingAllowMultipleSchedules != null)
                {
                    bool.TryParse(settingAllowMultipleSchedules.Value, out allowMultipleSchedules);
                }
                return allowMultipleSchedules;
            }
        }

        public bool EnabledPrivacyPolicy
        {
            get
            {
                bool enabledPrivacyPolicy = false;
                var settingEnabledPrivacyPolicy = _setting.GetChild("EnabledPrivacyPolicy");
                if (settingEnabledPrivacyPolicy != null)
                {
                    bool.TryParse(settingEnabledPrivacyPolicy.Value, out enabledPrivacyPolicy);
                }
                return enabledPrivacyPolicy;
            }
        }

        public List<int> EnabledTypeOfMeeting
        {
            get
            {
                List<int> meetingTypes = new List<int>();
                var settingMeetingTypes = _setting.GetChild("EnabledTypeOfMeeting");
                if (settingMeetingTypes != null)
                {
                    var types = settingMeetingTypes.Value.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                    var typesVal = types.Select(t => int.Parse(t));
                    meetingTypes.AddRange(typesVal);
                }
                return meetingTypes;
            }
        }

        public string FaceToFaceNote { get; set; }

        public bool UseOwnTeleconference
        {
            get
            {
                bool useOwnTeleconference = false;
                var settingUseOwnTeleconference = _setting.GetChild("UseOwnTeleconference");
                if (settingUseOwnTeleconference != null)
                {
                    bool.TryParse(settingUseOwnTeleconference.Value, out useOwnTeleconference);
                }
                return useOwnTeleconference;
            }
        }

        public List<string> SubscriberFields
        {
            get
            {
                List<string> subscribeFields = new List<string>();

                var settingFields = _setting.GetChild("SubscriberFields");
                if (settingFields != null)
                {
                    subscribeFields.AddRange(settingFields.Value.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries));
                }
                return subscribeFields;
            }
        }

        public List<string> RequiredFields
        {
            get
            {
                List<string> requiredFields = new List<string>();
                var settingRequiredFields = _setting.GetChild("RequiredFields");
                if (settingRequiredFields != null)
                {
                    requiredFields.AddRange(settingRequiredFields.Value.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries));
                }
                return requiredFields;
            }
        }

        public bool GoogleAnalyticsEnabled
        {
            get
            {
                bool enabledGoogleAnalytics = false;
                var settingGoogleAnalyticsEnabled = _setting.GetChild("GoogleAnalyticsEnabled");
                if (settingGoogleAnalyticsEnabled != null)
                {
                    bool.TryParse(settingGoogleAnalyticsEnabled.Value, out enabledGoogleAnalytics);
                }
                return enabledGoogleAnalytics;
            }
        }

        public bool ShowDisclaimerInfo
        {
            get
            {
                bool showDisclaimerInfo = false;
                var settingShowDisclaimerInfo = _setting.GetChild("ShowDisclaimerInfo");
                if (settingShowDisclaimerInfo != null)
                {
                    bool.TryParse(settingShowDisclaimerInfo.Value, out showDisclaimerInfo);
                }
                return showDisclaimerInfo;
            }
        }

        public bool ShowCookiePolicyInfo
        {
            get
            {
                bool showCookiePolicyInfo = false;
                var settingShowCookiePolicyInfo = _setting.GetChild("ShowCookiePolicyInfo");
                if (settingShowCookiePolicyInfo != null)
                {
                    bool.TryParse(settingShowCookiePolicyInfo.Value, out showCookiePolicyInfo);
                }
                return showCookiePolicyInfo;
            }
        }

        public bool ShowSupplyInfo
        {
            get
            {
                bool showSupplyInfo = false;
                var settingShowSupplyInfo = _setting.GetChild("ShowSupplyInfo");
                if (settingShowSupplyInfo != null)
                {
                    bool.TryParse(settingShowSupplyInfo.Value, out showSupplyInfo);
                }
                return showSupplyInfo;
            }
        }

        public bool ShowSupplierInfoLink
        {
            get
            {
                bool showSupplierInfoLink = false;
                var settingShowSupplierInfoLink = _setting.GetChild("ShowSupplierInfoLink");
                if (settingShowSupplierInfoLink != null)
                {
                    bool.TryParse(settingShowSupplierInfoLink.Value, out showSupplierInfoLink);
                }
                return showSupplierInfoLink;
            }
        }

        public bool EnableHeading
        {
            get
            {
                bool enableHeading = false;
                var settingEnableHeading = _setting.GetChild("EnableHeading");
                if (settingEnableHeading != null)
                {
                    bool.TryParse(settingEnableHeading.Value, out enableHeading);
                }
                return enableHeading;
            }
        }
    }
}
