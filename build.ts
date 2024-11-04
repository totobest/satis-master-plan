
// ESM
import { Notebook } from "crossnote"
import { copyFile, cp, mkdir, realpath, rename, rm, rmdir } from 'fs/promises';

async function main() {
    const notebookPath = await realpath(".")
    const notebook = await Notebook.init({
      notebookPath: notebookPath,
      config: {
        printBackground: false,
        enableScriptExecution: true, // <= For running code chunks.
      },
    });

    // Get the markdown engine for a specific note file in your notebook.
    const engine = notebook.getNoteMarkdownEngine('satis-master-plan.md');

    // html export
    await engine.htmlExport({ offline: false, runAllCodeChunks: true });
    
    // chrome (puppeteer) export
    //await engine.chromeExport({ fileType: 'pdf', runAllCodeChunks: true });

    await rm("dist", {recursive: true, force: true})
    await mkdir("dist")
    await rename("satis-master-plan.html", "dist/index.html")
    await cp("static", "dist/static", {recursive: true})
    //await rename("README.pdf", "dist/satis_master_plan.pdf")

    return process.exit();

}
main()