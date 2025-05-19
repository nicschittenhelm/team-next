/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  output: "export",
  trailingSlash: true,

  // Use basePath and assetPrefix only in production
  basePath: process.env.NODE_ENV === "production" ? "/team-next" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/team-next/" : "",

  // Configure images for static export
  images: {
    unoptimized: true,
  },

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true, (already set above)

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
};

export default nextConfig;
