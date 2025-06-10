import { data } from "@remix-run/node";
export async function loader() {
  return data({
    ok: true,
    message: "Hello from the API",
  });
}

export async function action({ request }) {
  const method = request.method;

  switch (method) {
    case "POST":
      return data({ message: "Success", method: "POST" });
    case "PATCH":
      return data({ message: "Success", method: "PATCH" });

    default:
      return new Response({ message: "Method not allowed" }, { status: 405 });
  }
}
