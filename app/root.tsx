import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useMatches,
} from "@remix-run/react";
import sharedStyles from '~/styles/shared.css';
import Error from "~/components/util/Error";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: sharedStyles }
  ];
};

function Document({title, children}: any) {
  const matches = useMatches();
  const disableJS = matches.some(match => match.handle?.disableJS);

  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!disableJS && <Scripts />}
        <LiveReload />
      </body>
    </html>
  )
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <Document title={caught.statusText}>
      <main>
        <Error title={caught.statusText}>
          <p>{caught.data?.message || "Something went wrong"}</p>
          <p>Back to <Link to="/">safety</Link></p>
        </Error>
      </main>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="An error occured">
      <main>
        <Error title="An error occured">
          <p>{error?.message || "Something went wrong"}</p>
          <p>Back to <Link to="/">safety</Link></p>
        </Error>
      </main>
    </Document>
  );
}
