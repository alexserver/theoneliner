import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";
import randomImage from "~/lib/imageslist";

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
  const pic = randomImage();
  return (
    <div className="w-full bg-gradient-to-b from-indigo-800 to-slate-900 h-screen flex justify-center items-center">
      <img
        alt="laugh"
        src={pic}
        className="w-full object-cover h-screen absolute top-0 left-0 z-0"
      />
      <h1 className="text-3xl text-center text-white bg-slate-900 rounded-xl z-10 p-4 opacity-80 font-bold max-w-3xl">
        {joke.content}
      </h1>
    </div>
  );
}
