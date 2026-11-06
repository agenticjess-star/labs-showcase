import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import fallbackProjects from "./projects.json";

export type Project = {
  name: string;
  slug: string;
  description: string;
  language: string;
  status: string;
  github_url: string;
  live_url: string | null;
  image_url: string | null;
};

// Fallback data: the audited 37-project list. Used when Supabase is not
// configured, when the query fails, or when the table is still empty, so
// the page never goes blank before the table is seeded.
export const fallback: Project[] = fallbackProjects as Project[];

function getClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function isProject(row: unknown): row is Project {
  if (!row || typeof row !== "object") return false;
  const r = row as Record<string, unknown>;
  return (
    typeof r.name === "string" &&
    typeof r.slug === "string" &&
    typeof r.github_url === "string"
  );
}

// Server-side only: pages call this, never the browser directly.
// Supabase first; JSON fallback on missing env vars, query error, or
// zero rows — never an empty page.
export async function getProjects(): Promise<Project[]> {
  const client = getClient();
  if (!client) return fallback;
  try {
    const { data, error } = await client
      .from("projects")
      .select("name, slug, description, language, status, github_url, live_url, image_url");
    if (error || !data || data.length === 0) return fallback;
    const rows = data.filter(isProject).map((r) => ({
      name: r.name,
      slug: r.slug,
      description: typeof r.description === "string" ? r.description : "",
      language: typeof r.language === "string" ? r.language : "",
      status: typeof r.status === "string" ? r.status : "Check pending",
      github_url: r.github_url,
      live_url: typeof r.live_url === "string" ? r.live_url : null,
      image_url: typeof r.image_url === "string" ? r.image_url : null,
    }));
    return rows.length > 0 ? rows : fallback;
  } catch {
    return fallback;
  }
}
