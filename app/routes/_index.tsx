import { unsplash } from "~/lib/unsplash.server";
import { type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { json } from "@vercel/remix";
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

export async function loader(/*params: LoaderFunctionArgs*/) {
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
    <div className="w-full">
      <div className="fixed top-0 w-full text-lg bg-gradient-to-r from-indigo-800 to-indigo-300 flex justify-between items-center z-20 p-1 text-slate-800">
        <h3 className="text-2xl text-white">The oneliner</h3>
        <p>A random joke comedian</p>
        <a
          href="https://github.com/alexserver/theoneliner"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
      <div className="w-full bg-gradient-to-b from-indigo-800 to-slate-900 h-screen flex flex-col justify-center items-center z-0 gap-20">
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
      </div>
    </div>
  );
}
