import supabase from "~/lib/supabase";
import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader(params: LoaderArgs) {
  const { data: joke, error } = await supabase.rpc("one_joke").single();

  console.log(joke);
  return json({ joke });
}

export default function () {
  const { joke } = useLoaderData();
  return <div>{joke.content}</div>;
}
