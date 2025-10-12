import fs from "fs";

async function fetchTranslations() {
  const locales = ["en", "tr", "de"];

  for (const locale of locales) {
    const res = await fetch(`${process.env.BACKEND_URL}/languages/${locale}`, {
      headers: {
        'Authorization': `Bearer ${process.env.BACKEND_API_TOKEN}`
      }
    });
    
    if (res.status !== 200) {
      console.error(`[Fetch Translations] Failed to fetch ${locale} translations: ${res.status} ${res.statusText}`);
      continue;
    }

    const data = await res.json();

    if (!fs.existsSync("./messages")) {
      fs.mkdirSync("./messages");
    }

    fs.writeFileSync(
      `./messages/${locale}-new.json`,
      JSON.stringify(data, null, 2)
    );

    console.log(`[Fetch Translations] ${locale} translations saved`);
  }
}

fetchTranslations().catch(console.error);