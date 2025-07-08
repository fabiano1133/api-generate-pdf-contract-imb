FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18-slim AS production

# Instala Chromium e fontes, incluindo Verdana (via ttf-mscorefonts-installer)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        chromium \
        fonts-ipafont-gothic \
        fonts-wqy-zenhei \
        fonts-thai-tlwg \
        fonts-kacst \
        fonts-freefont-ttf \
        fontconfig \
        ttf-mscorefonts-installer \
        libxss1 \
        ca-certificates \
        wget && \
    fc-cache -f -v && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/src/domain/pdf/views ./src/domain/pdf/views

RUN mkdir -p /app/src/domain/pdf/views/aluguel-fiador \
    && mkdir -p /app/src/domain/pdf/views/aluguel-caucao

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

EXPOSE 3333

CMD ["node", "dist/server.js"]
