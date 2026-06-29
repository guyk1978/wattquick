import { COOKIE_CONSENT_KEY } from "@/lib/cookie-consent";

/**
 * Runs in <head> before paint — sets Google Consent Mode defaults and
 * restores granted analytics + advertising for returning visitors.
 */
export const consentInitScript = `(function(){try{window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=window.gtag||gtag;gtag("consent","default",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",wait_for_update:500});var s=localStorage.getItem("${COOKIE_CONSENT_KEY}");if(s==="granted"){gtag("consent","update",{analytics_storage:"granted",ad_storage:"granted",ad_user_data:"granted",ad_personalization:"granted"});}}catch(e){}})();`;
