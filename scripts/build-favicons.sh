#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE="$ROOT/static/logo-original.svg"
FAVICON_SVG="$ROOT/static/favicon.svg"
FAVICON_PNG="$ROOT/static/favicon.png"
APPLE_TOUCH_ICON="$ROOT/static/apple-touch-icon.png"

if ! command -v magick >/dev/null 2>&1; then
  echo "error: ImageMagick 'magick' command not found" >&2
  exit 1
fi

cp "$SOURCE" "$FAVICON_SVG"

perl -0pi -e '
  my ($tx, $ty, $scale) = /<g\b[^>]*transform="translate\(([-\d.]+)\s+([-\d.]+)\)\s+scale\(([-\d.]+)\)"[^>]*>(.*?)<\/g>/s
    ? ($1, $2, $3)
    : die "error: expected a <g> with transform=\"translate(x y) scale(n)\"\n";

  my ($group) = /<g\b[^>]*transform="translate\([-\d.]+\s+[-\d.]+\)\s+scale\([-\d.]+\)"[^>]*>(.*?)<\/g>/s;
  my @rects;

  while ($group =~ /<rect\b([^>]*)\/>/g) {
    my $attrs = $1;
    my ($x) = $attrs =~ /\bx="([-\d.]+)"/;
    my ($y) = $attrs =~ /\by="([-\d.]+)"/;
    my ($w) = $attrs =~ /\bwidth="([-\d.]+)"/;
    my ($h) = $attrs =~ /\bheight="([-\d.]+)"/;

    die "error: rect missing x/y/width/height\n" unless defined $x && defined $y && defined $w && defined $h;

    push @rects, sprintf(
      q{    <rect x="%g" y="%g" width="%g" height="%g"/>},
      $tx + $x * $scale,
      $ty + $y * $scale,
      $w * $scale,
      $h * $scale
    );
  }

  my $flat_group = qq{<g fill="#fff">\n} . join("\n", @rects) . qq{\n  </g>};

  s/fill="black"/fill="#000"/g;
  s/<g\b[^>]*transform="translate\([-\d.]+\s+[-\d.]+\)\s+scale\([-\d.]+\)"[^>]*>.*?<\/g>/$flat_group/s;
' "$FAVICON_SVG"

magick -background none "$FAVICON_SVG" -resize 512x512 "PNG32:$FAVICON_PNG"
magick -background none "$FAVICON_SVG" -resize 180x180 "PNG32:$APPLE_TOUCH_ICON"

echo "wrote:"
echo "  $FAVICON_SVG"
echo "  $FAVICON_PNG"
echo "  $APPLE_TOUCH_ICON"
