// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["image.tmdb.org"],
//     unoptimized: true,
//   },
// };

// export default nextConfig;

// ///////////////////////////////////////////////////////////////////////////////////////////////////

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["image.tmdb.org"],
//     unoptimized: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org"], // Убедитесь, что это правильный домен
    unoptimized: true, // Используйте только если необходимо отключить оптимизацию изображений
  },
  typescript: {
    ignoreBuildErrors: false, // Постарайтесь не игнорировать ошибки
  },
  eslint: {
    ignoreDuringBuilds: false, // Постарайтесь не игнорировать ошибки
  },
};

export default nextConfig;
