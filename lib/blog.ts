import fs from "fs";
import path from "path";

const blogsDirectory = path.join(process.cwd(), "data/blogs");

export function getSortedBlogsData() {
  // Get file names under /data/blogs
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(blogsDirectory);
  const allBlogsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(blogsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Simple manual frontmatter parser
    const parts = fileContents.split("---");
    const frontmatterRaw = parts[1] || "";
    const content = parts.slice(2).join("---").trim();

    const metadata: any = {};
    frontmatterRaw.split("\n").forEach(line => {
      const [key, ...valueParts] = line.split(":");
      if (key && valueParts.length > 0) {
        const k = key.trim();
        let v = valueParts.join(":").trim();
        
        // Remove quotes if present
        if (v.startsWith('"') && v.endsWith('"')) {
          v = v.substring(1, v.length - 1);
        }

        // Handle tags array [ "A", "B" ]
        if (v.startsWith("[") && v.endsWith("]")) {
          metadata[k] = v.substring(1, v.length - 1).split(",").map(t => t.trim().replace(/^"|"$/g, ''));
        } else if (v === "true") {
          metadata[k] = true;
        } else if (v === "false") {
          metadata[k] = false;
        } else {
          metadata[k] = v;
        }
      }
    });

    return {
      id,
      content,
      ...metadata,
    };
  });

  // Sort blogs by date
  return allBlogsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
