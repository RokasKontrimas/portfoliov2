import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => {
    // Load environment variables from the corresponding .env file
    const env = loadEnv(mode, process.cwd());

    return {

        base: '/',
        plugins: [react()],
        server: {
            host: true,
            port: 3000,
        },
        define: {
            'process.env': {
                ...process.env,
                ...Object.keys(env).reduce((acc, key) => {
                    acc[key] = env[key];
                    return acc;
                }, {}),
            },
        },
    };
});
