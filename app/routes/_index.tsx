import { unsplash } from "~/lib/unsplash.server";
import { json, type MetaFunction } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { prisma } from "~/lib/db.server";
import { Image } from "~/components/Image";

export const meta: MetaFunction = () => {
  return [
    { title: "The Oneliner" },
    { name: "description", content: "A Random joke generator" },
  ];
};

const fetchImage = async (): Promise<Record<string, any> | null> => {
  try {
    const result = await unsplash.photos.getRandom({
      collectionIds: [
        "4921005",
        "1344310",
        "wGTIMDscrNs",
        "3727708",
        "9525949",
      ],
    });
    if (result && result.response) {
      const newImages = result.response as Record<string, any>;
      return newImages;
    } else {
      console.error("Failed to get images from Unsplash");
      return null;
    }
  } catch (err) {
    console.error("Error loading unpslash images ", err);
  }
  return null;
};

async function fetchJoke() {
  try {
    const count = await prisma.joke.count();
    const jokes = await prisma.joke.findMany({
      take: 1,
      skip: Math.floor(Math.random() * count),
    });
    if (jokes.length > 0) {
      return jokes.at(0);
    }
    return null;
  } catch (err) {
    console.error("Prisma failed to fetch joke ", err);
    return null;
  }
}

export async function loader() {
  const joke = await fetchJoke();
  const image = await fetchImage();
  return json({ joke, image });
}

export default function Index() {
  const { joke, image } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return (
      <>
        <Image.Loading />
        <h1 className="text-3xl text-center text-white bg-slate-900 rounded-xl z-10 p-4 opacity-80 font-bold max-w-3xl">
          Next comedian coming...
        </h1>
      </>
    );
  }

  return (
    <>
      <Image image={image} />
      <h1 className="text-3xl text-center text-white bg-slate-900 rounded-xl z-10 p-4 opacity-80 font-bold max-w-3xl">
        {joke ? joke.content : "Oops I'm not feeling funny enough"}
      </h1>
      <Form method="get" className="z-10">
        <button
          type="submit"
          className="bg-indigo-800 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Hit me!
        </button>
      </Form>
    </>
  );
}
