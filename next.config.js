if (!URL.canParse(process.env.WORDPRESS_API)) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}

const { protocol, hostname, port } = new URL(process.env.WORDPRESS_API);
const {
  protocol: protocolGrav,
  hostname: hostnameGrav,
  port: portGrav,
} = new URL(process.env.GRAVATAR_API);

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: protocol.slice(0, -1),
        hostname,
        port,
        pathname: `/**`,
      },
      {
        protocol: protocolGrav.slice(0, -1),
        hostname: hostnameGrav,
        port: portGrav,
        pathname: "/**",
      },
    ],
  },
};
