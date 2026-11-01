"use client";
// Spotify webapp file upload, built on the real beUI File Upload block
// (components/motion/file-upload.tsx): drag-and-drop queue with progress
// rows, retry and removal. This wrapper narrows it to Spotify JSON files
// and reports the chosen files plus a loaded summary back to the caller.
import * as React from "react";
import { FileUpload, type FileUploadItem } from "@/components/motion/file-upload";
import { Badge } from "@/components/ui/badge";

export function SpotifyFileUpload({
  onFiles,
}: {
  onFiles: (files: File[]) => void;
}) {
  const [items, setItems] = React.useState<FileUploadItem[]>([]);
  const loaded = items.filter((i) => i.status === "success" || i.file);

  return (
    <div className="flex flex-col gap-4">
      <FileUpload
        value={items}
        onValueChange={setItems}
        onFilesAdded={(_, files) => {
          onFiles(files);
          setItems((prev) =>
            prev.map((i) =>
              files.some((f) => f.name === i.name) ? { ...i, status: "success" as const, progress: 100 } : i
            )
          );
        }}
        accept=".json,application/json"
        multiple
        title="Drop your Spotify Extended Streaming History JSONs here"
        description="Files stay in this browser session. Nothing is uploaded to a server from this demo."
        browseLabel="Browse JSON files"
      />
      {loaded.length > 0 ? (
        <p className="text-sm text-muted-foreground">
          <Badge variant="secondary">{loaded.length} file{loaded.length === 1 ? "" : "s"} loaded</Badge>{" "}
          {loaded.map((i) => i.name).join(", ")}
        </p>
      ) : null}
    </div>
  );
}
