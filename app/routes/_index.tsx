import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import styles from "~/styles/joke.css";
import { prisma } from "~/lib/prisma.server";
import Image from "~/components/Image";

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
  return (
    <div className="w-full bg-gradient-to-b from-indigo-800 to-slate-900 p-4 h-screen flex justify-center items-center">
      <div className="overflow-hidden absolute top-0 left-0 w-full max-h-full">
        <Image />
      </div>
      <h1 className="joke-content">{joke.content}</h1>
    </div>
  );
}
