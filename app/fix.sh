#!/bin/bash
set -e

# Run from the root of your project: ~/projects/it_final_project
# Usage: bash fix_deploy.sh

DEPLOY_DIR="docs"

echo "==> Cleaning old deploy folder..."
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR/assets/images"

echo "==> Copying index.html..."
cp index.html "$DEPLOY_DIR/index.html"

echo "==> Fixing asset paths (absolute -> relative)..."
sed -i 's|/assets/|./assets/|g' "$DEPLOY_DIR/index.html"

echo "==> Copying images..."
cp -r assets/images/. "$DEPLOY_DIR/assets/images/"

echo ""
echo "==> Verifying structure:"
find "$DEPLOY_DIR" -type f | sort

echo ""
echo "==> Image references in HTML:"
grep -oE '"\.\/assets\/images\/[^"]+' "$DEPLOY_DIR/index.html" | sort -u

echo ""
echo "==> Checking for any remaining absolute /assets/ paths:"
REMAINING=$(grep -c '"/assets/' "$DEPLOY_DIR/index.html" || true)
if [ "$REMAINING" -gt 0 ]; then
  echo "  WARNING: $REMAINING absolute paths still found. Re-running sed..."
  sed -i "s|\"/assets/|\"./assets/|g" "$DEPLOY_DIR/index.html"
else
  echo "  OK — no absolute /assets/ paths remaining."
fi

echo ""
echo "=============================="
echo "DONE. Now run:"
echo ""
echo "  git add docs/"
echo "  git commit -m 'deploy: static site to docs/'"
echo "  git push"
echo ""
echo "Then in GitHub:"
echo "  Settings -> Pages -> Source: main branch | /docs folder"
echo "=============================="
