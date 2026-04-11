import { getCollections } from "./lib/shopify/index";

async function list() {
  try {
    const collections = await getCollections();
    console.log("COLLECTIONS_START");
    console.log(
      JSON.stringify(
        collections.map((c) => ({ title: c.title, handle: c.handle })),
        null,
        2,
      ),
    );
    console.log("COLLECTIONS_END");
  } catch (e) {
    console.error(e);
  }
}

list();
