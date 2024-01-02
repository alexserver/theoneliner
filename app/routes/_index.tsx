import { unsplash } from "~/lib/unsplash.server";
import { json, type MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { prisma } from "~/lib/db.server";

export const meta: MetaFunction = () => {
  return [
    { title: "The Oneliner" },
    { name: "description", content: "A Random joke generator" },
  ];
};

const fetchRandomImage = async (): Promise<Record<string, any> | null> => {
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

async function getJoke() {
  // let joke = null;
  // try {
  //   const count = await prisma.joke.count();
  //   const jokes = await prisma.joke.findMany({
  //     take: 1,
  //     skip: Math.floor(Math.random() * count),
  //   });
  //   joke = jokes.at(0);
  // } catch (err) {
  //   console.error("Prisma failed to fetch joke ", err);
  // }
  // return joke;
  return {
    id: 7,
    content:
      "Scientists have recently discovered a food that greatly reduces sex drive. It’s called wedding cake.",
    author: "anonymous",
    createdAt: "2023-12-30T22:56:31.848Z",
    updatedAt: "2023-12-30T22:56:24.482Z",
  };
}

export async function loader() {
  const joke = await getJoke();
  const image = await fetchRandomImage();
  // console.log({ joke });
  // console.log({ image });
  return json({ joke, image });
}

export default function Index() {
  const { joke, image } = useLoaderData<typeof loader>();
  if (!joke || !image) {
    return <div>No data</div>;
  }

  return (
    <>
      <img
        alt="laugh"
        src={image ? image.urls.full : ""}
        className="w-full object-cover h-screen absolute top-0 left-0 z-0"
      />
      <h1 className="text-3xl text-center text-white bg-slate-900 rounded-xl z-10 p-4 opacity-80 font-bold max-w-3xl">
        {joke.content}
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
