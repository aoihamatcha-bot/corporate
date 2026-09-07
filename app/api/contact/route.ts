// Fail closed until a real delivery adapter and approved privacy policy are connected.
// Do not read, store, log or forward the submitted body in the unconfigured state.
export async function POST() {
  return Response.json(
    {
      error: "CONTACT_NOT_CONFIGURED",
      message: "お問い合わせ窓口は準備中です。送信は行われていません。",
    },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}
