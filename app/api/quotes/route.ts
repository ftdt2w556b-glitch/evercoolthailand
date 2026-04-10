import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const admin = createAdminClient();

    // Extract fields
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = (formData.get("email") as string) || null;
    const propertyType = formData.get("propertyType") as string;
    const serviceType = formData.get("serviceType") as string;
    const areaSqm = formData.get("areaSqm") as string;
    const numRooms = formData.get("numRooms") as string;
    const currentAcCount = formData.get("currentAcCount") as string;
    const humidityConcern = formData.get("humidityConcern") === "true";
    const moldVisible = formData.get("moldVisible") === "true";
    const coastalLocation = formData.get("coastalLocation") === "true";
    const notes = (formData.get("notes") as string) || null;
    const preferredLang = (formData.get("preferredLang") as string) || "en";
    const preferredTier = (formData.get("preferredTier") as string) || null;

    // Validate required fields
    if (!name || !phone || !propertyType || !serviceType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Upload photos
    const photoPaths: string[] = [];
    const photos = formData.getAll("photos") as File[];
    for (const photo of photos) {
      if (photo.size > 0) {
        const buffer = Buffer.from(await photo.arrayBuffer());
        const ext = photo.name.split(".").pop() || "jpg";
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadError } = await admin.storage
          .from("quote-photos")
          .upload(fileName, buffer, {
            contentType: photo.type,
            upsert: false,
          });

        if (!uploadError) {
          photoPaths.push(fileName);
        }
      }
    }

    // Insert quote
    const { data, error } = await admin.from("quotes").insert({
      name,
      phone,
      email,
      property_type: propertyType,
      service_type: serviceType,
      area_sqm: areaSqm ? Number(areaSqm) : null,
      num_rooms: numRooms ? Number(numRooms) : null,
      current_ac_count: currentAcCount ? Number(currentAcCount) : null,
      humidity_concern: humidityConcern,
      mold_visible: moldVisible,
      coastal_location: coastalLocation,
      photo_paths: photoPaths,
      notes,
      preferred_language: preferredLang,
      preferred_tier: preferredTier,
      status: "new",
    }).select("id").single();

    if (error) {
      console.error("Quote insert error:", error);
      return NextResponse.json({ error: "Failed to save quote" }, { status: 500 });
    }

    // Send email notification (non-blocking — don't fail if email fails)
    try {
      const { sendEmail } = await import("@/lib/email/send");
      await sendEmail({
        to: "info@evercoolthailand.com",
        subject: `New Quote Request from ${name}`,
        html: `
          <h2>New Quote Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
          <p><strong>Property:</strong> ${propertyType}</p>
          <p><strong>Service:</strong> ${serviceType.replace(/-/g, " ")}</p>
          ${areaSqm ? `<p><strong>Area:</strong> ${areaSqm} m²</p>` : ""}
          ${numRooms ? `<p><strong>Rooms:</strong> ${numRooms}</p>` : ""}
          ${preferredTier ? `<p><strong>Preferred Tier:</strong> ${preferredTier}</p>` : ""}
          ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
          <p><strong>Photos:</strong> ${photoPaths.length}</p>
        `,
      });
    } catch {
      // Email failure is non-critical
    }

    return NextResponse.json({ success: true, quoteId: data.id });
  } catch (err) {
    console.error("Quote API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
