FROM node:7

RUN useradd --user-group --create-home --shell /bin/false nodejs

ENV HOME=/home/nodejs
ENV NODE_ENV=production
ENV PORT=3000
ENV LOGGER_LEVEL=silly
ENV LOGGER_ENABLED=true
ENV SESSION_KEY=koasess

COPY package.json $HOME/app/
RUN chown -R nodejs:nodejs $HOME/*
USER nodejs
WORKDIR $HOME/app
RUN npm install

CMD ["node", "build/server.js"]
