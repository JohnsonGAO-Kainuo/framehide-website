import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // next-intl official recommended matcher
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)" ]
};
