import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "vuqhrcxz", // Provided by user
  dataset: "production",
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: "2024-04-01", // Use a recent date string
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
