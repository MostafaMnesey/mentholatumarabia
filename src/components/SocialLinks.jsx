import { Icon } from "@iconify/react";

export default function SocialLinks({ currentSocials, className }) {
  const socials = [
    { key: "facebook",  icon: "mdi:facebook",           color: "hover:text-blue-600" },
    { key: "instagram", icon: "mdi:instagram",          color: "hover:text-pink-500" },
    { key: "snapchat",  icon: "mdi:snapchat",           color: "hover:text-yellow-400" },
    { key: "tiktok",    icon: "ic:baseline-tiktok",     color: "hover:text-black" },
    { key: "youtube",   icon: "mdi:youtube",            color: "hover:text-red-600" },
    { key: "x",         icon: "mdi:x",                  color: "hover:text-black" },
    { key: "pinterest", icon: "mdi:pinterest",          color: "hover:text-red-500" },
  ];

  return (
    <div className={className || "social_links flex items-center justify-center gap-5 mt-5 lg:mt-0 lg:absolute lg:right-0 lg:top-0"}>
      {currentSocials ? (
        socials.map((social) => {
          const link = currentSocials?.[social.key];
          if (!link) return null;
          return (
            <a
              key={social.key}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit our ${social.key.charAt(0).toUpperCase() + social.key.slice(1)} page`}
              className={`text-[#0067B1] text-3xl transition-all duration-300 hover:scale-110 ${social.color}`}
            >
              <Icon icon={social.icon} />
            </a>
          );
        })
      ) : (
        Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
        ))
      )}
    </div>
  );
}
