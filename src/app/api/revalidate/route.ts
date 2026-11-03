import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity "on publish" webhook. Each query is tagged with the document types it reads,
 * so publishing a country only rebuilds pages that show countries.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return new NextResponse("SANITY_REVALIDATE_SECRET not set", { status: 500 });

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret);
  if (!isValidSignature) return new NextResponse("Invalid signature", { status: 401 });
  if (!body?._type) return new NextResponse("Missing _type", { status: 400 });

  revalidateTag(body._type);
  return NextResponse.json({ revalidated: body._type });
}
