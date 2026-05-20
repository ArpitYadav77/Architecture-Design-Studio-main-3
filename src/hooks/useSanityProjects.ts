import { useEffect, useState } from "react";
import { sanityClient, urlFor } from "@/lib/sanity";

export interface SanityProject {
  _id: string;
  title: string;
  slug: string;
  category: string;
  year: number;
  location: string;
  coverImage: string;
  gallery?: string[];
  description?: string;
  featured?: boolean;
}

export function useSanityProjects() {
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] | order(year desc) {
          _id,
          title,
          "slug": slug.current,
          "category": category->title,
          year,
          location,
          coverImage,
          featured
        }`;
        
        const data = await sanityClient.fetch(query);
        
        // Map the image objects to actual URLs
        const formattedData = data.map((item: any) => ({
          ...item,
          coverImage: item.coverImage ? urlFor(item.coverImage).url() : "",
        }));

        setProjects(formattedData);
      } catch (error) {
        console.error("Error fetching projects from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading };
}
