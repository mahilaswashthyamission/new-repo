import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    // Verify secret token
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const { type, slug } = body;

    // Revalidate based on content type
    switch (type) {
      case "program":
        revalidatePath("/programs");
        if (slug) revalidatePath(`/programs/${slug}`);
        break;
      case "newsPost":
        revalidatePath("/news");
        if (slug) revalidatePath(`/news/${slug}`);
        break;
      case "job":
        revalidatePath("/jobs");
        if (slug) revalidatePath(`/jobs/${slug}`);
        break;
      case "teamMember":
        revalidatePath("/team");
        break;
      case "album":
        revalidatePath("/gallery");
        break;
      case "document":
        revalidatePath("/documents");
        break;
      case "faq":
        revalidatePath("/faqs");
        break;
      default:
        // Revalidate homepage for any other changes
        revalidatePath("/");
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json({ error: "Error revalidating" }, { status: 500 });
  }
}
