const { Domains } = require("resend/build/src/domains/domains");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.clerk.com","uploadthing.com","utfs.io"],
  },
};

module.exports = nextConfig;
