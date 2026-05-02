/* ── SEARCH BAR ───────────────────────────────────────────────────── */

async function loadFragment(fragmentPath) {
  const response = await fetch(fragmentPath);
  if (!response.ok) {
    throw new Error(`Unable to load fragment: ${fragmentPath}`);
  }

  return response.text();
}

export async function initSearchBar() {
  const searchRoot = document.querySelector("[data-search-root]");
  if (!searchRoot) {
    return;
  }

  try {
    searchRoot.innerHTML = await loadFragment(
      new URL("./search-bar.html", import.meta.url),
    );
  } catch {
    return;
  }
}
