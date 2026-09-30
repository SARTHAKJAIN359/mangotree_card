export const CONFIG = Object.freeze({
  canonicalUrl: "",   // set to the final card URL, e.g. "https://card.mangotreeinsurance.com/"
  profile: {
    name: "Amit Jain",
    title: "Founder & CEO",
    company: "MangoTree Insurance & Investments",
    tagline: "Aam ke aam, guthliyon ke daam.",
    phoneDisplay: "9911502502",
    phoneE164: "+919911502502",
    whatsapp: "https://wa.me/919911502502",
    email: "mailto:mangotreeinsurance@gmail.com",
    emailAddress: "mangotreeinsurance@gmail.com",
    website: "https://www.mangotreeinsurance.com/",
    address: { street: "324, Cloud-9 Towers, Vaishali", locality: "Ghaziabad", region: "", postal: "201010", country: "India" },
    hours: "Mon-Sun: 9 AM-7 PM",
    mapsUrl: null,                       // TODO(approval): exact Google Maps link
    googleReview: "https://g.page/r/CfZoMek3yZ3lEBM/review",
  },
  socials: [   // MangoTree's OWN profiles — Follow/Connect only, never used for sharing
    { id: "instagram", label: "Instagram", url: "https://www.instagram.com/mangotreeinsurance" },
    { id: "facebook",  label: "Facebook",  url: "https://www.facebook.com/mangotreeinsurancee" },
    { id: "youtube",   label: "YouTube",   url: "https://youtube.com/@mangotreeinsuranceinvestment?si=_3bppY8iTiJeYnHM" },
  ],
  share: {       // the visitor shares THIS PAGE, not MangoTree's profiles
    title: "MangoTree Insurance & Investments — Amit Jain",
    text: "Check out MangoTree Insurance & Investments for personalised insurance and investment guidance.",
  },
  services: [
    {id: "life", label: "Life Insurance", group: "protect", blurb: "Protect your family's financial future.", partners: []},
    {id: "health", label: "Health Insurance", group: "protect", blurb: "Comprehensive medical coverage.", partners: []},
    {id: "child", label: "Children Future", group: "plan", blurb: "Secure your child's education.", partners: []},
    {id: "accident", label: "Accident Insurance", group: "protect", blurb: "Coverage against unexpected events.", partners: []},
    {id: "retire", label: "Retirement Insurance", group: "plan", blurb: "Plan for a peaceful retirement.", partners: []},
    {id: "residence", label: "Residential Insurance", group: "protect", blurb: "Protect your home and belongings.", partners: []},
    {id: "mutual", label: "Mutual Funds", group: "grow", blurb: "Grow your wealth smartly.", partners: []},
    {id: "travel", label: "Travel Insurance", group: "protect", blurb: "Travel with peace of mind.", partners: []}
  ],
  partners: [
    {id: "hdfc-ergo", name: "HDFC ERGO", logo: "./assets/img/partner-hdfc-ergo.jpeg", alt: "HDFC ERGO Logo"},
    {id: "lic", name: "LIC", logo: "./assets/img/partner-lic.jpeg", alt: "LIC Logo"},
    {id: "niva-bupa", name: "Niva Bupa", logo: "./assets/img/partner-niva-bupa.jpeg", alt: "Niva Bupa Logo"},
    {id: "star-health", name: "STAR Health", logo: "./assets/img/partner-star-health.jpeg", alt: "STAR Health Logo"}
  ],
  awards: [
    {id: "award-1", thumb: "./assets/img/award-recognition.png", full: "./assets/img/award-recognition.png", caption: "Recognition for Amit Kumar Jain referencing Delhi-Karkardooma LNI II for exemplary performance.", alt: "Award recognition certificate for Amit Kumar Jain"}
  ],
});

export const getShareUrl = () =>
  CONFIG.canonicalUrl || (location.origin + location.pathname);
