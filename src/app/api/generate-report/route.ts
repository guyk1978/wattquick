import { NextResponse } from "next/server";
import {
  buildReportPdf,
  isValidPdfReportData,
} from "@/lib/pdf-report-server";

/** Edge runtime for Cloudflare Pages compatibility. */
export const runtime = "edge";

/** Never statically cache this route — responses are dynamic and origin-specific. */
export const dynamic = "force-dynamic";

const ALLOWED_ORIGIN = "https://wattquick.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
} as const;

function applyCorsHeaders(headers: Headers): void {
  for (const [key, value] of Object.entries(corsHeaders)) {
    headers.set(key, value);
  }
  headers.set("Vary", "Origin");
}

function corsResponse(body: BodyInit | null, init: ResponseInit = {}): NextResponse {
  const headers = new Headers(init.headers);
  applyCorsHeaders(headers);
  return new NextResponse(body, { ...init, headers });
}

function corsJson(body: unknown, init: ResponseInit = {}): NextResponse {
  const headers = new Headers(init.headers);
  applyCorsHeaders(headers);
  headers.set("Content-Type", "application/json");
  headers.set("Cache-Control", "no-store");
  return NextResponse.json(body, { ...init, headers });
}

/** Handle CORS preflight — must return 200 so the browser proceeds with POST. */
export async function OPTIONS() {
  return corsResponse(null, { status: 200 });
}

export async function GET() {
  return corsJson({ ok: true, endpoint: "generate-report" });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return corsJson({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidPdfReportData(body)) {
    return corsJson(
      { error: "Expected calculatorName, inputs, and results fields" },
      { status: 400 }
    );
  }

  const pdfBytes = buildReportPdf(body);
  const headers = new Headers({
    "Content-Type": "application/pdf",
    "Content-Disposition": 'attachment; filename="report.pdf"',
    "Cache-Control": "no-store, no-cache, must-revalidate",
  });
  applyCorsHeaders(headers);

  const pdfBuffer = pdfBytes.buffer.slice(
    pdfBytes.byteOffset,
    pdfBytes.byteOffset + pdfBytes.byteLength
  ) as ArrayBuffer;

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers,
  });
}
