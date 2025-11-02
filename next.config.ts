import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/apps/:path*",
        destination: "http://127.0.0.1:8000/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
