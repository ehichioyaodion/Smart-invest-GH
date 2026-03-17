import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/Firebase/Config";
import { signOut } from "firebase/auth";

export async function POST(request: NextRequest) {
  try {
    // Sign out from Firebase
    await signOut(auth);

    // Create response with cleared cookies and headers
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // Clear all cookies
    response.cookies.getAll().forEach((cookie) => {
      response.cookies.delete(cookie.name);
    });

    // Set cache control headers to prevent caching
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate",
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {
        error: "Failed to logout",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
