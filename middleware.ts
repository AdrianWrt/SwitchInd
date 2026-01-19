import { auth } from "@/auth";
import { NextRequest } from "next/server";

export default auth((req: NextRequest) => {
  if (!req.auth) {
    const url = new URL("/login", req.url);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/checkout"],
};
