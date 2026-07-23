import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const resolved = locale ?? "en";
  const messages = (await import(`./${resolved}.json`)).default;
  return { locale: resolved, messages };
});
