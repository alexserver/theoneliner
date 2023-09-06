import supabase from "~/lib/supabase";
import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import styles from "~/styles/joke.css";

function zeroPad(num: number, totalLength: number): string {
  return String(num).padStart(totalLength, "0");
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader(params: LoaderArgs) {
  const { data: joke, error } = await supabase.rpc("one_joke").single();

  console.log(joke);
  return json({ joke });
}

export default function () {
  const { joke } = useLoaderData();
  const picNumber = zeroPad(Math.floor(Math.random() * 11), 2);
  const backgroundClass = `back pic${picNumber}`;
  return (
    <div className={backgroundClass}>
      <h1 className="joke-content">{joke.content}</h1>
    </div>
  );
}
