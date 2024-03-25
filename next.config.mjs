/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // or 'http' depending on your requirement
        hostname: "kzgqkcieuscdyzgnlvvk.supabase.co",
        // Optionally include pathname if you want to match specific paths
        // pathname: '/storage/v1/object/public/post-images/*',
      },
    ],
    domains: ["kzgqkcieuscdyzgnlvvk.supabase.co"],
    domains: ["pbs.twimg.com"], // Add the external domain here
  },
};

export default nextConfig;
