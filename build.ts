

import { Notebook } from "crossnote";
import { cp, mkdir, realpath, rename, rm } from 'fs/promises';
import { basename, format } from 'path';

const SOURCE_FILENAME = "satis-master-plan.md"

async function main() {
  const notebookPath = await realpath("./src")
  const notebook = await Notebook.init({
    notebookPath: notebookPath,
    config: {
      printBackground: false,
      enableScriptExecution: true, // <= For running code chunks.
    },
  });

  // Get the markdown engine for a specific note file in your notebook.
  const engine = notebook.getNoteMarkdownEngine(SOURCE_FILENAME);

  // html export
  await engine.htmlExport({ offline: false, runAllCodeChunks: true });

  const destFilename = format({ base: basename(SOURCE_FILENAME), ext: "html" })

  process.chdir("src")
  await rm("dist", { recursive: true, force: true })
  await mkdir("dist")
  await rename(destFilename, "dist/index.html")
  await cp("assets", "dist/assets", { recursive: true })
}
await main()
