(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,t){return e+t}function t(e,t){return e*t}function n(e){return`Hello, ${e}!`}var r=document.querySelector(`#app`);r&&(r.innerHTML=`
    <div style="font-family: system-ui; padding: 20px; max-width: 600px; margin: 0 auto;">
      <h1>TypeScript Web App with Testing &amp; Debugging</h1>
      <p>This project includes:</p>
      <ul>
        <li>✅ TypeScript for type safety</li>
        <li>✅ Jest for unit testing</li>
        <li>✅ ESLint for code quality</li>
        <li>✅ Prettier for formatting</li>
        <li>✅ VS Code debugging integration</li>
      </ul>
      <div id="demo" style="margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 5px;">
        <h3>Demo:</h3>
        <p>add(2, 3) = <code>${e(2,3)}</code></p>
        <p>multiply(4, 5) = <code>${t(4,5)}</code></p>
        <p>${n(`Developer`)}</p>
      </div>
      <div style="margin-top: 20px; font-size: 12px; color: #666;">
        <p><strong>Next steps:</strong></p>
        <ul>
          <li>Edit files in <code>src/</code> folder</li>
          <li>Run <code>npm test</code> to test your code</li>
          <li>Press F5 to debug</li>
          <li>Check README.md for detailed documentation</li>
        </ul>
      </div>
    </div>
  `);