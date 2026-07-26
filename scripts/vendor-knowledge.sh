#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
vendor_root="$root/knowledge/vendor"
temp_root="$(mktemp -d)"
trap 'rm -rf "$temp_root"' EXIT

rm -rf "$vendor_root"
mkdir -p "$vendor_root"

git clone --depth 1 --filter=blob:none --sparse \
  https://github.com/asdecided/core.git "$temp_root/core"
git -C "$temp_root/core" sparse-checkout set docs
cp -R "$temp_root/core/docs" "$vendor_root/core"
# The Core documentation homepage uses a repository-local MkDocs template.
# This knowledge base provides its own homepage and does not link to that file.
rm -f "$vendor_root/core/index.md"

git clone --depth 1 --filter=blob:none --sparse \
  https://github.com/asdecided/spec.git "$temp_root/spec"
git -C "$temp_root/spec" sparse-checkout set \
  vocabulary conformance schema
mkdir -p "$vendor_root/spec"
cp "$temp_root/spec/SPEC.md" "$vendor_root/spec/SPEC.md"
cp -R "$temp_root/spec/vocabulary" "$vendor_root/spec/vocabulary"
cp -R "$temp_root/spec/conformance" "$vendor_root/spec/conformance"
cp -R "$temp_root/spec/schema" "$vendor_root/spec/schema"

echo "Vendored Core documentation and RAC specification."
