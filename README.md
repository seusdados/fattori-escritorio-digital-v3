# Fattori Escritório Digital V3

Plataforma de resolução automatizada de problemas jurídicos digitais.

## 🏗️ Estrutura

```
fattori-v3/
├── frontend/          # React + Vite + Tailwind
├── backend/           # Node.js + Express + Supabase
├── railway.json       # Configuração Railway
└── README.md
```

## 🚀 Deploy no Railway

### 1. Fork/Clone este repositório no GitHub

### 2. No Railway:
- Criar novo projeto
- Conectar ao repositório GitHub
- Adicionar dois serviços:
  - **Frontend**: Root Directory = `frontend`
  - **Backend**: Root Directory = `backend`

### 3. Variáveis de Ambiente

**Backend:**
```
SUPABASE_URL=https://gxsncnggihsxxebceago.supabase.co
SUPABASE_ANON_KEY=sua_chave_aqui
SUPABASE_SERVICE_KEY=sua_service_key_aqui
PORT=3001
CORS_ORIGIN=https://seu-frontend.railway.app
```

**Frontend:**
```
VITE_API_URL=https://seu-backend.railway.app
VITE_SUPABASE_URL=https://gxsncnggihsxxebceago.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_aqui
```

## 💻 Desenvolvimento Local

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (outro terminal)
cd frontend
npm install
npm run dev
```

## 📋 Funcionalidades

- ✅ Diagnóstico gratuito em 2 minutos
- ✅ 12 playbooks especializados
- ✅ Roteiros passo-a-passo
- ✅ Integração com Supabase
- ✅ Sistema de pagamentos (simulado)

## 🔧 Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Zustand
- **Backend:** Node.js, Express, Supabase Client
- **Database:** Supabase (PostgreSQL)
- **Deploy:** Railway

## 📄 Licença

Proprietário - Fattori Advogados © 2026
