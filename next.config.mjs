
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */

const withThePWA = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

export default withThePWA({});
