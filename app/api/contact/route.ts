import { getDictionary } from "@/content/dictionaries";
// Fail closed until a real delivery adapter and approved privacy policy are connected.
// Read only the URL's locale selector. Never read, store, log or forward the submitted body.
export async function POST(request: Request) {
  const locale =
    new URL(request.url).searchParams.get("lang") === "en" ? "en" : "ja";
  return Response.json(
    {
      error: "CONTACT_NOT_CONFIGURED",
      message: getDictionary(locale).contact.unconfigured,
    },
    {
      status: 503,
      headers: { "Cache-Control": "no-store", "Content-Language": locale },
    },
  );
}
