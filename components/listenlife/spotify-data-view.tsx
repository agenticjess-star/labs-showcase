"use client";
// View for uploaded Spotify Extended Streaming History JSONs.
// Parses the files in the browser and shows what is actually in them:
// qualifying plays (>=30s), distinct songs, year range, top artists.
// Nothing is invented: every number here is computed from the files the
// user just uploaded. If a file is not a Spotify history array, it says so.
import * as React from "react";

export type ParsedHistory = {
  files: string[];
  events: number;
  plays: number;
  songs: number;
  artists: number;
  years: string;
  topArtists: { name: string; plays: number }[];
  errors: string[];
};

export async function parseHistory(files: File[]): Promise<ParsedHistory> {
  let events = 0;
  let plays = 0;
  const songs = new Set<string>();
  const artists = new Map<string, number>();
  const years = new Set<number>();
  const errors: string[] = [];
  for (const file of files) {
    try {
      const data = JSON.parse(await file.text()) as unknown;
      const arr = Array.isArray(data) ? data : [];
      if (!Array.isArray(data)) { errors.push(`${file.name}: not a JSON array, skipped.`); continue; }
      for (const e of arr as Record<string, unknown>[]) {
        events += 1;
        const ms = typeof e.ms_played === "number" ? e.ms_played : 0;
        const track = typeof e.master_metadata_track_name === "string" ? e.master_metadata_track_name : "";
        const artist = typeof e.master_metadata_album_artist_name === "string" ? e.master_metadata_album_artist_name : "";
        const ts = typeof e.ts === "string" ? e.ts : "";
        const year = ts ? new Date(ts).getFullYear() : NaN;
        if (ms >= 30000) {
          plays += 1;
          if (track) songs.add(track);
          if (artist) artists.set(artist, (artists.get(artist) ?? 0) + 1);
        }
        if (!Number.isNaN(year)) years.add(year);
      }
    } catch {
      errors.push(`${file.name}: could not be parsed as JSON.`);
    }
  }
  const sortedYears = [...years].sort((a, b) => a - b);
  return {
    files: files.map((f) => f.name),
    events,
    plays,
    songs: songs.size,
    artists: artists.size,
    years: sortedYears.length ? `${sortedYears[0]}–${sortedYears[sortedYears.length - 1]}` : "—",
    topArtists: [...artists.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, p]) => ({ name, plays: p })),
    errors,
  };
}

export function SpotifyDataView({ data }: { data: ParsedHistory }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-card p-6">
      <h3 className="text-xl font-bold">Your data, viewed</h3>
      <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
        <div><p className="text-2xl font-bold">{data.plays.toLocaleString()}</p><p className="text-xs text-muted-foreground">Qualifying plays (≥30s)</p></div>
        <div><p className="text-2xl font-bold">{data.songs.toLocaleString()}</p><p className="text-xs text-muted-foreground">Distinct songs</p></div>
        <div><p className="text-2xl font-bold">{data.artists.toLocaleString()}</p><p className="text-xs text-muted-foreground">Distinct artists</p></div>
        <div><p className="text-2xl font-bold">{data.years}</p><p className="text-xs text-muted-foreground">Years in files</p></div>
      </div>
      <p className="text-sm text-muted-foreground">
        {data.events.toLocaleString()} raw events across {data.files.length} file{data.files.length === 1 ? "" : "s"}.
      </p>
      {data.topArtists.length > 0 ? (
        <ol className="flex flex-col gap-1">
          {data.topArtists.map((a, i) => (
            <li key={a.name} className="flex justify-between text-sm">
              <span>{i + 1}. {a.name}</span><span className="text-muted-foreground">{a.plays.toLocaleString()} plays</span>
            </li>
          ))}
        </ol>
      ) : null}
      {data.errors.map((e) => (
        <p key={e} className="text-sm text-destructive">{e}</p>
      ))}
    </div>
  );
}
