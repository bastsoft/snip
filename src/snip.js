import importGistId from "./lib/import-gist.js"
import Queue from "./lib/commands-queue.js";
import getCy from "./lib/cy.js";

import createMenu from "./lib/create-menu.js";
import fetchjsonp from "./lib/fetchjsonp.js";

const cy = getCy(Queue);

Object.defineProperty(window, "cy", {
    get: function () {
        cy.initEl(document);

        return cy;
    },
    configurable: true
});

export default {
  load(url){
    import(url).then((res)=>{
      const snippets = res.default;
      createMenu(snippets);
    });
  },
  loadGist(data){
    importGistId(fetchjsonp, document, data.id).then(gists => {
      const js = encodeURIComponent(gists[data.file].text);
      const script = document.createElement('script');

      script.type = 'module';
      script.innerHTML = `snip.load(\`data:text/javascript;charset=utf-8,${js}\`);`;
      console.log(script);
      document.getElementsByTagName('head')[0].appendChild(script);
      script.parentNode.removeChild(script);

      //this.load('data:text/javascript;charset=utf-8,' + js);
    });
  },
};