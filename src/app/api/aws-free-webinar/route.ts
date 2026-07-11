import { NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

// Define schema for webinar registration form
const webinarSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
  profession: z.enum(["student", "developer", "employee"], {
    message: "Please select a valid profession",
  }),
  orgName: z.string().min(2, "College/Company/Startup name is required"),
  domainOrDegree: z.string().min(2, "Work domain or Degree is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const result = webinarSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    
    const validatedData = result.data;
    
    // Generate Registration ID and Timestamp
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const registrationId = `AWS-WEB-${dateStr}-${randomSuffix}`;
    
    const newSubmission = {
      registrationId,
      timestamp,
      ...validatedData,
      status: "Registered",
      remarks: "Registered via AWS Free Webinar Form",
    };

    console.log("Saving new AWS Free Webinar submission:", newSubmission);

    // 1. Local JSON Persistence
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      const submissionsPath = path.join(dataDir, "webinar_submissions.json");
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
      console.log(`Saved submission locally to data/webinar_submissions.json`);
    } catch (fsError) {
      console.error("Local file system writing error:", fsError);
    }

    // 2. Google Sheets Integration (using separate GOOGLE_SHEET_WEBINAR_URL)
    const webappUrl = process.env.GOOGLE_SHEET_WEBINAR_URL?.replace(/['"]/g, "").trim();
    let googleSheetSaved = false;
    let googleSheetError = null;

    if (webappUrl && !webappUrl.includes("placeholder-webinar-sheet-url")) {
      try {
        console.log(`Posting data to Webinar Google Sheets Web App: ${webappUrl}`);
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
            console.log("Successfully recorded webinar row in Google Sheet!");
          } else {
            googleSheetError = resJson.message || "Apps Script failed to record";
            console.warn("Webinar Google Sheet error response:", resJson);
          }
        } else {
          googleSheetError = `HTTP Status ${response.status}`;
          console.warn(`Webinar Google Sheet endpoint returned status ${response.status}`);
        }
      } catch (sheetError: any) {
        googleSheetError = sheetError.message || sheetError.toString();
        console.error("Failed sending request to Webinar Google Sheets Webapp:", sheetError);
      }
    } else {
      console.log("GOOGLE_SHEET_WEBINAR_URL not set in environment or holds placeholder value. Skipping Sheets submission.");
    }

    return NextResponse.json({
      success: true,
      data: newSubmission,
      googleSheets: {
        submitted: googleSheetSaved,
        error: googleSheetError,
        configured: !!webappUrl && !webappUrl.includes("placeholder-webinar-sheet-url"),
      },
    });

  } catch (error: any) {
    console.error("General error handling webinar registration:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
