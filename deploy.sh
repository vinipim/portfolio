#!/bin/bash

# 🚀 Script de Deploy Automático - Vinicius M. Blanchard Portfolio
# Este script faz deploy automático no Cloudflare Pages

echo "🚀 Iniciando deploy do portfolio..."

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script na raiz do projeto${NC}"
    exit 1
fi

# 2. Instalar dependências
echo -e "${BLUE}📦 Instalando dependências...${NC}"
pnpm install

# 3. Build do projeto
echo -e "${BLUE}🔨 Fazendo build do projeto...${NC}"
pnpm build

# 4. Commit e push para GitHub
echo -e "${BLUE}📤 Enviando para GitHub...${NC}"
git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main

echo -e "${GREEN}✅ Deploy concluído!${NC}"
echo -e "${GREEN}Seu site será atualizado automaticamente no Cloudflare Pages em 1-2 minutos${NC}"
echo ""
echo "🌐 Acesse: https://dash.cloudflare.com para ver o status"

