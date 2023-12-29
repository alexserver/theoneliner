import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "The Oneliner" },
    { name: "description", content: "A Random joke generator" },
  ];
};

export async function loader(/*params: LoaderFunctionArgs*/) {
  const joke = {
    id: "1",
    content: "My IQ test results came back. They were negative.",
    author: "Anonymous",
  };
  return json({ joke });
}

export default function Index() {
  const { joke } = useLoaderData<typeof loader>();
  return (
    <div className="w-full">
      <h1>The comedian</h1>
      <div>{joke.content}</div>
    </div>
  );
}
