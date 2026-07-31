import { getSupabaseAdmin } from "@/lib/supabase";
import HomeBannerView from "./HomeBannerView";

export default async function HomeBanner() {
  try {
    const supabase = getSupabaseAdmin();

    // Query diretta senza passare per Logger / Repository intermedi
    const { data, error } = await supabase
      .from("system_settings")
      .select("key, value");

    if (error || !data) {
      return null;
    }

    // Mapping rapido delle chiavi
    const settings = Object.fromEntries(
      data.map((item) => [item.key, item.value])
    );

    const enabled = settings["HOME_BANNER_ENABLED"] === "true";
    if (!enabled) return null;

    const now = new Date();
    const startAt = settings["HOME_BANNER_START_AT"]
      ? new Date(settings["HOME_BANNER_START_AT"])
      : null;
    const endAt = settings["HOME_BANNER_END_AT"]
      ? new Date(settings["HOME_BANNER_END_AT"])
      : null;

    if (startAt && !isNaN(startAt.getTime()) && now < startAt) return null;
    if (endAt && !isNaN(endAt.getTime()) && now > endAt) return null;

    const bannerData = {
      enabled,
      version: settings["HOME_BANNER_VERSION"] || "1",
      title: settings["HOME_BANNER_TITLE"] || "",
      message: settings["HOME_BANNER_MESSAGE"] || "",
      type: (settings["HOME_BANNER_TYPE"] as any) || "info",
      startAt: startAt ? startAt.toISOString() : null,
      endAt: endAt ? endAt.toISOString() : null,
      dismissible: settings["HOME_BANNER_DISMISSIBLE"] !== "false",
      buttonText: settings["HOME_BANNER_BUTTON_TEXT"] || "",
      buttonUrl: settings["HOME_BANNER_BUTTON_URL"] || "",
    };

    return <HomeBannerView banner={bannerData as any} />;
  } catch (err) {
    // Intercetta silenziosamente senza mandare in crash la build
    return null;
  }
}