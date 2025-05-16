/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/nicschittenhelm/team-next",
  assetPrefix: "/nicschittenhelm/team-next/",

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
};

export default nextConfig;
