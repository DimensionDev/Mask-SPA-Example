/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config) => {
        if (config.experiments?.asyncWebAssembly) {
            console.warn('Please remove experimental.asyncWebAssembly = true in the config')
        }
        config.experiments ??= {}
        config.experiments.asyncWebAssembly = true

        if (config?.resolve?.extensionAlias?.['.js']?.includes('.ts')) {
            console.warn('Please remove .ts from the extensionAlias')
        }
        config.resolve ??= {}
        config.resolve.extensionAlias = {
            '.js': ['.tsx', '.ts', '.js']
        }
        return config
    },
}

module.exports = nextConfig
