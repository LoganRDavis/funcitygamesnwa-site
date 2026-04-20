#!/usr/bin/env bash
set -euo pipefail

echo "Installing system image tools..."
sudo apt-get update -qq
sudo apt-get install -y -qq \
  imagemagick \
  webp \
  optipng \
  jpegoptim

echo "Installing Python image libs..."
pip install --quiet --no-warn-script-location \
  pillow \
  rembg[cpu]

echo "Versions:"
magick --version | head -1 || convert --version | head -1
cwebp -version
python3 -c "import PIL; print('pillow', PIL.__version__)"
python3 -c "import rembg; print('rembg ok')"

# CLI tools
curl -fsSL https://claude.ai/install.sh | bash

# Playwright (browser + system deps) so Claude can screenshot the dev site via the Playwright MCP server
echo "Installing Playwright Chromium..."
npx --yes playwright install --with-deps chromium

echo "Done."
