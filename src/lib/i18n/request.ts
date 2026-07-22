import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const messages = (await import(`./${locale}.json`)).default;
  return { locale: locale!, messages };
});
