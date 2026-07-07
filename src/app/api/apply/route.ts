import { NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

// Define the Zod schema for validating request payloads
const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
  college: z.string().min(2, "College name is required"),
  course: z.string().min(2, "Course name is required"),
  year: z.string().min(1, "Academic year is required"),
  city: z.string().min(2, "City/Location is required"),
  utr: z.string().regex(/^[a-zA-Z0-9]{6,22}$/, "UTR must be a alphanumeric code of 6-22 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const result = registrationSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    
    const validatedData = result.data;
    
    // Generate Application ID and Timestamp
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const applicationId = `AWS-${dateStr}-${randomSuffix}`;
    
    const newSubmission = {
      applicationId,
      timestamp,
      ...validatedData,
      status: "Pending Verification",
      remarks: "Registered via AWS Programme Form",
    };

    console.log("Saving new AWS Programme submission:", newSubmission);

    // 1. Local Persistence Fallback
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      const submissionsPath = path.join(dataDir, "submissions.json");
      let submissions = [];
      if (fs.existsSync(submissionsPath)) {
        const fileData = fs.readFileSync(submissionsPath, "utf-8");
        try {
          submissions = JSON.parse(fileData);
        } catch {
          submissions = [];
        }
      }
      submissions.push(newSubmission);
      fs.writeFileSync(submissionsPath, JSON.stringify(submissions, null, 2), "utf-8");
      console.log(`Saved submission locally to data/submissions.json`);
    } catch (fsError) {
      console.error("Local file system writing error:", fsError);
    }

    // 2. Google Sheets Integration
    const webappUrl = process.env.GOOGLE_SHEET_WEBAPP_URL?.replace(/['"]/g, "").trim();
    let googleSheetSaved = false;
    let googleSheetError = null;

    if (webappUrl) {
      try {
        console.log(`Posting data to Google Sheets Web App: ${webappUrl}`);
        // We set a timeout for the fetch request so it doesn't block the client
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(webappUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSubmission),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const resJson = await response.json();
          if (resJson.status === "success" || resJson.result === "success") {
            googleSheetSaved = true;
            console.log("Successfully recorded row in Google Sheet!");
          } else {
            googleSheetError = resJson.message || "Apps Script failed to record";
            console.warn("Google Sheet error response:", resJson);
          }
        } else {
          googleSheetError = `HTTP Status ${response.status}`;
          console.warn(`Google Sheet endpoint returned status ${response.status}`);
        }
      } catch (sheetError: any) {
        googleSheetError = sheetError.message || sheetError.toString();
        console.error("Failed sending request to Google Sheets Webapp:", sheetError);
      }
    } else {
      console.log("GOOGLE_SHEET_WEBAPP_URL not set in environment. Skipping Sheets submission.");
    }

    return NextResponse.json({
      success: true,
      data: newSubmission,
      googleSheets: {
        submitted: googleSheetSaved,
        error: googleSheetError,
        configured: !!webappUrl,
      },
    });

  } catch (error: any) {
    console.error("General error handling apply submission:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
