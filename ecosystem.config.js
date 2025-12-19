module.exports = {
  apps: [
    {
      name: 'unc-regsys-frontend',
      script: './dist/index.js',
      args: 'start',
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
    },
  ],
  deploy: {
    prod: {
      user: 'webmaster',
      host: '202.131.236.60',
      ref: 'origin/main',
      key: '~/.ssh/id_ed25519',
      repo: 'git@unc-frontend.github.com:BetterMongolia/unc-regsys-frontend.git',
      path: '/opt/regsys-frontend',
      'pre-setup':
        'sudo mkdir -p /opt/regsys-frontend && sudo chown ubuntu:ubuntu /opt/regsys-frontend',
      'post-deploy':
        'npm i && ln -sf /opt/regsys-frontend/envs/prod.env ./.env && npm run build && pm2 reload ecosystem.config.cjs',
    },
  },
}
