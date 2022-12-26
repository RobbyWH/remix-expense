import { LinksFunction, LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import marketingStyles from"~/styles/marketing.css";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFromSession } from "~/data/auth.server";

export function loader({request}: LoaderArgs) {
  return getUserFromSession(request)
};

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: marketingStyles }
  ];
};