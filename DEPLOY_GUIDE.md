# 🚀 Guia de Deploy - Portfolio Vinicius M. Blanchard

## 📦 Passo 1: Extrair o ZIP

1. Baixe o arquivo `portfolio-vinicius-blanchard.zip`
2. Extraia em uma pasta no seu computador
3. Abra o terminal/cmd nessa pasta

## 🔧 Passo 2: Instalar Dependências

```bash
npm install -g pnpm
pnpm install
```

## 🗄️ Passo 3: Configurar Banco de Dados (Opcional para teste local)

Para testar localmente, você precisa de um banco MySQL. Para deploy no Vercel, use PlanetScale (gratuito).

### Opção A: PlanetScale (Recomendado - Gratuito)
1. Acesse https://planetscale.com
2. Crie conta gratuita
3. Crie um database
4. Copie a connection string
5. Cole no arquivo `.env`:
```
DATABASE_URL="mysql://..."
```

### Opção B: MySQL Local
```bash
# Instale MySQL e crie um database
mysql -u root -p
CREATE DATABASE portfolio;
```

## 🌐 Passo 4: Deploy no Vercel (GRATUITO)

### 4.1: Criar Repositório no GitHub

```bash
cd portfolio-vijicius
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/portfolio.git
git push -u origin main
```

### 4.2: Deploy no Vercel

1. Acesse https://vercel.com
2. Faça login com GitHub
3. Clique em **"Add New Project"**
4. Selecione seu repositório `portfolio`
5. Configure as variáveis de ambiente:

```
DATABASE_URL=sua_connection_string_do_planetscale
BUILT_IN_FORGE_API_KEY=auto
BUILT_IN_FORGE_API_URL=https://api.manus.im
JWT_SECRET=seu_secret_aleatorio_aqui
OAUTH_SERVER_URL=https://api.manus.im
```

6. Clique em **"Deploy"**
7. Aguarde 2-3 minutos
8. Seu site estará no ar! 🎉

## 🔐 Credenciais Admin

- **Email**: danielblanchard@keemail.me
- **Senha**: RichardNixon123!

Acesse `/admin` para gerenciar o site.

## 🌍 Domínio Customizado (Opcional)

### Opção 1: Njalla (Privacy-focused)
1. Compre domínio em https://njal.la
2. No Vercel, vá em Settings → Domains
3. Adicione seu domínio
4. Configure DNS no Njalla

### Opção 2: 1984 Hosting (Privacy-focused)
1. Compre domínio em https://www.1984.is
2. Mesmos passos acima

## ✅ Checklist Final

- [ ] Código no GitHub
- [ ] Database no PlanetScale
- [ ] Deploy no Vercel
- [ ] Testou login admin
- [ ] Criou primeiro post
- [ ] Domínio configurado (opcional)

## 🆘 Problemas Comuns

### "Database connection failed"
- Verifique se a `DATABASE_URL` está correta
- Execute `pnpm db:push` localmente primeiro

### "Admin login not working"
- Execute o seed: `pnpm tsx server/seedAdmin.ts`
- Verifique se o banco de dados está conectado

### "Build failed on Vercel"
- Verifique se todas as variáveis de ambiente estão configuradas
- Veja os logs de erro no Vercel

## 📞 Suporte

Se tiver problemas, verifique:
1. Logs do Vercel
2. Console do navegador (F12)
3. Documentação do Vercel: https://vercel.com/docs

---

**Seu site está pronto para o mundo! 🌍**

