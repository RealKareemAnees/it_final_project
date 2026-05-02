/* ── FOOTER ───────────────────────────────────────────────────────── */

async function loadFragment(fragmentPath) {
  const response = await fetch(fragmentPath);
  if (!response.ok) {
    throw new Error(`Unable to load fragment: ${fragmentPath}`);
  }

  return response.text();
}

export async function initFooter() {
  const footerRoot = document.querySelector("[data-footer-root]");
  if (!footerRoot) {
    return;
  }

  try {
    footerRoot.innerHTML = await loadFragment(
      new URL("./footer.html", import.meta.url),
    );
  } catch {
    return;
  }

  const yearElement = footerRoot.querySelector("[data-footer-year]");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}
