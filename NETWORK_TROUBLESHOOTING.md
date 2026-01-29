# "Network request failed" – Análise e Troubleshooting

## O que significa o erro

`TypeError: Network request failed` ocorre quando o **fetch/XHR não consegue completar a requisição** – ou seja, o app **não consegue falar com o servidor** (Supabase). Não é erro de API (401, 404, 500); é falha **antes** de receber qualquer resposta HTTP.

- **Onde aparece:** `fetch.umd.js` → `xhr.onerror` (requisição falhou na camada de rede).
- **Destino das requisições:** `https://hwtqognmvygeuyjmmzhw.supabase.co` (Auth + REST).

---

## Onde o app faz requisições de rede (Supabase)

| Local              | Chamada                      | Quando                        |
| ------------------ | ---------------------------- | ----------------------------- |
| `useSession`       | `supabase.auth.getSession()` | Ao abrir o app (index)        |
| `useSession`       | `onAuthStateChange`          | Listener contínuo             |
| `useAuthVM` signIn | `signInWithPassword`         | Ao clicar em Log In           |
| `useAuthVM` signIn | `getSession`                 | Após login                    |
| `useAuthVM` signUp | `signUp`                     | Ao clicar em Sign Up          |
| `useAuthVM` signUp | `user_profiles` upsert       | Após cadastro                 |
| `HomeHeader`       | `user_profiles` select       | Se não tiver nome no metadata |

Qualquer uma dessas chamadas pode disparar "Network request failed" se a rede falhar.

---

## Causas mais prováveis

### 1. **Dispositivo/simulador sem acesso à internet ou ao Supabase**

- Celular/emulador em Wi‑Fi instável, sem internet ou que bloqueia acesso externo.
- **Teste:** abrir `https://hwtqognmvygeuyjmmzhw.supabase.co` no Safari/Chrome do próprio dispositivo/emulador.

### 2. **Rede diferente entre app e Supabase**

- App roda no dispositivo; Supabase está na nuvem.
- Metro (ex.: `192.168.68.102:8082`) serve o bundle; as chamadas HTTP vão direto para `*.supabase.co`.
- Se a rede do dispositivo bloquear `*.supabase.co`, dá "Network request failed".

### 3. **VPN ou proxy**

- VPN/proxy corporativo ou pessoal às vezes bloqueia ou altera tráfego HTTPS.
- **Teste:** desligar VPN e testar de novo.

### 4. **Projeto Supabase pausado (free tier)**

- Projetos gratuitos pausam após inatividade.
- **Teste:** abrir o [Dashboard Supabase](https://supabase.com/dashboard) e ver se o projeto está "Paused". Se estiver, "Restore project".

### 5. **iOS Simulator**

- Simulador às vezes tem problema de rede (DNS, etc.).
- **Teste:** Reset: Device → Erase All Content and Settings; ou reiniciar o Mac.

### 6. **Firewall / rede corporativa ou institucional**

- Firewall ou política de rede bloqueando acesso a `supabase.co`.
- **Teste:** mesmo app em outra rede (ex.: 4G no celular, outro Wi‑Fi).

### 7. **Variáveis de ambiente**

- URL ou anon key erradas podem causar outros erros, mas em alguns fluxos o cliente pode falhar de forma genérica.
- **Confirme:** `.env` com `EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_ANON_KEY` corretos (você já usa isso).

---

## Checklist rápido

- [ ] Celular/emulador com internet estável (abrir um site no browser).
- [ ] Abrir `https://hwtqognmvygeuyjmmzhw.supabase.co` no browser do dispositivo/emulador (deve carregar, mesmo que 404 em algumas rotas).
- [ ] Projeto Supabase **não** pausado no Dashboard.
- [ ] VPN desligada (ou testar em outra VPN/rede).
- [ ] Testar em **outra rede** (ex.: 4G no celular vs Wi‑Fi).
- [ ] iOS Simulator: "Erase All Content and Settings" ou reiniciar o Mac.
- [ ] `npx expo start --clear` e rodar o app de novo.

---

## Testes de conectividade (no Mac)

```bash
# Supabase deve responder (pode ser 404 em /, mas conexão OK)
curl -I "https://hwtqognmvygeuyjmmzhw.supabase.co"

# Auth health (anon)
curl -s "https://hwtqognmvygeuyjmmzhw.supabase.co/auth/v1/health"
```

Se `curl` falhar no Mac, o problema é de rede/DNS/firewall no ambiente.

---

## O que já está implementado no app

- **Auth (signIn/signUp):** tratamento de "Network request failed" e exibição de mensagem amigável ("Sem conexão. Verifique sua internet e tente novamente.").
- **HomeHeader (user_profiles):** `try/catch` na busca do perfil; em caso de erro, usa fallback (ex.: email) e não quebra o app.
- **user_profiles upsert no signUp:** `try/catch`; se falhar, o cadastro continua (nome já vai no `user_metadata`).

Ou seja: mesmo com falha de rede, o app não deveria crashar nesses pontos. O "Network request failed" que você vê pode estar vindo de:

1. **`useSession` → `getSession()`**  
   Se der rede aqui, o `getSession` falha e o app pode ficar travado em "loading" ou gerar erro não tratado.

2. **Qualquer outra chamada Supabase** antes de termos tratamento em todos os fluxos.

---

## O que já foi ajustado no código

- **`useSession`:** `getSession()` agora tem `.catch()`: em caso de "Network request failed", setamos `session: null` e `isLoading: false`, e o app redireciona para sign-in em vez de travar.
- **Auth (signIn/signUp):** tratamento de rede e mensagem amigável.
- **HomeHeader (`user_profiles`):** `try/catch`; em erro, usa fallback (email) e não quebra.
- **SignUp `user_profiles` upsert:** `try/catch`; falha não invalida o cadastro.

---

## Resumo

| Tipo      | Descrição                                                                                                                  |
| --------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Erro**  | `TypeError: Network request failed` (fetch/XHR)                                                                            |
| **Causa** | App não consegue falar com `https://...supabase.co`                                                                        |
| **Onde**  | `getSession`, `signIn`, `signUp`, `user_profiles`, etc.                                                                    |
| **Ações** | Ver checklist acima; checar rede, VPN, Supabase pausado, simulador; melhorar tratamento em `useSession` e demais chamadas. |
