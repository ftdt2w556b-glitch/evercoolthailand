import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { name, phone, email, subject, message } = await request.json();

    if (!name || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const admin = createAdminClient();

    const { error } = await admin.from("contact_messages").insert({
      name,
      phone,
      email: email || null,
      subject: subject || "General Inquiry",
      message,
    });

    if (error) {
      console.error("Contact insert error:", error);
      return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
    }

    // Non-blocking email notification
    try {
      const { sendEmail } = await import("@/lib/email/send");
      await sendEmail({
        to: "info@evercoolthailand.com",
        subject: `New Contact Message from ${name}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });
    } catch {
      // Email failure is non-critical
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
