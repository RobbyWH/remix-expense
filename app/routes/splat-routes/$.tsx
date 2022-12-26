import { LoaderArgs, redirect } from "@remix-run/node"

export async function loader({params}: LoaderArgs) {
  if (params['*'] === 'exp') {
    return redirect('/expenses');
  }
  throw new Response('Not found', {status: 404});
};