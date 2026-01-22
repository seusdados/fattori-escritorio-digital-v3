# Fattori Escritório Digital V3

Plataforma de resolução automatizada de problemas jurídicos digitais.

## 🏗️ Estrutura

```
fattori-v3/
├── frontend/          # React + Vite + Tailwind
├── backend/           # Node.js + Express + Supabase
└── README.md
```

## 🚀 Deploy no Railway

### 1. Backend
- Conecte o repositório ao Railway
- Configure o Root Directory: `backend`
- Adicione as variáveis de ambiente:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `PORT` (Railway define automaticamente)

### 2. Frontend
- Crie novo serviço no Railway
- Configure o Root Directory: `frontend`
- Adicione variável de ambiente:
  - `VITE_API_URL` (URL do backend no Railway)

## 🔧 Desenvolvimento Local

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📦 Variáveis de Ambiente

### Backend (.env)
```env
SUPABASE_URL=https://gxsncnggihsxxebceago.supabase.co
SUPABASE_ANON_KEY=sua_chave_aqui
PORT=3001
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
VITE_SUPABASE_URL=https://gxsncnggihsxxebceago.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_aqui
```

## 📋 Funcionalidades

- ✅ Diagnóstico gratuito em 2 minutos
- ✅ 12 playbooks jurídicos especializados
- ✅ Roteiros passo-a-passo
- ✅ Integração com Supabase
- ✅ Sistema de pagamentos (simulado)

## 🎯 Verticais

1. **PIX & Fraudes** - Golpes, falso depósito, MED 2.0
2. **Redes Sociais (Acusados)** - Conta suspensa, recursos
3. **Redes Sociais (Vítimas)** - Difamação, perfil falso
4. **Direito do Consumidor** - Compras online, não entrega

## 📄 Licença

Proprietário - Fattori Advogados © 2026
