import fs from "fs";
import path from "path";

async function fetchFavicon() {
  try {
    const faviconUrl = `${process.env.NEXT_PUBLIC_BUCKET}/theme/favicon.ico`;
    
    console.log(`[Fetch Favicon] Fetching from: ${faviconUrl}`);
    
    if (res.status !== 200) {
      console.error(`[Fetch Favicon] Failed to fetch favicon: ${res.status} ${res.statusText}`);
      return;
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const src = "./src/app";
    if (!fs.existsSync(src)) {
      fs.mkdirSync(src, { recursive: true });
    }

    const faviconPath = path.join(src, "favicon.ico");
    fs.writeFileSync(faviconPath, buffer);

    console.log(`[Fetch Favicon] favicon.ico saved to ${faviconPath}`);
  } catch (error) {
    console.error("[Fetch Favicon] Error:", error);
  }
}

if (process.env.PREBUILD === "1") {
  fetchFavicon().catch(console.error);
} else {
  console.log("[Fetch Favicon] PREBUILD not set to 1, skipping fetch");
}