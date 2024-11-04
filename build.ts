
// ESM
import { Notebook } from "crossnote"

async function main() {
    const notebook = await Notebook.init({
      notebookPath: '/home/lefebvret/z/Downloads/11/satis',
      config: {
        printBackground: false,
        enableScriptExecution: true, // <= For running code chunks.
      },
    });

    // Get the markdown engine for a specific note file in your notebook.
    const engine = notebook.getNoteMarkdownEngine('README.md');

    // html export
    await engine.htmlExport({ offline: false, runAllCodeChunks: true });
    
    // chrome (puppeteer) export
    await engine.chromeExport({ fileType: 'pdf', runAllCodeChunks: true });

}
main()