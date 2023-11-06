import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import styles from "~/styles/joke.css";
import { prisma } from '~/lib/prisma.server';

function zeroPad(num: number, totalLength: number): string {
  return String(num).padStart(totalLength, "0");
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader(params: LoaderArgs) {
  const jokesCount = await prisma.joke.count();
  const jokes = await prisma.joke.findMany({
    take: 1,
    skip: Math.floor(Math.random() * jokesCount),
  });
  const joke = jokes.at(0);
  return json({ joke });
}

export default function () {
  const { joke } = useLoaderData();
  const picNumber = zeroPad(Math.floor(Math.random() * 10), 2);
  const backgroundClass = `back pic${picNumber}`;
  return (
    <div className={backgroundClass}>
      <h1 className="joke-content">{joke.content}</h1>
    </div>
  );
}
