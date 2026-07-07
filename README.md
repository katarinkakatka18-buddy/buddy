# Buddy – katalóg lokálnych služieb (Bratislava a BA kraj)

Webová appka (PWA) postavená vo Vite + React + Tailwind, s reálnou databázou
(Supabase) pre registrácie poskytovateľov.

## Spustenie na vlastnom počítači

```bash
npm install
npm run dev
```

## Premenné prostredia (Supabase)

Appka potrebuje pripojenie na Supabase, aby registrácia poskytovateľov fungovala
naozaj (inak appka bežne funguje, len s ukážkovými dátami). V hostingu (Cloudflare
Pages) nastav:

- `VITE_SUPABASE_URL` – Project URL z Supabase (Settings → API Keys)
- `VITE_SUPABASE_ANON_KEY` – Publishable key z Supabase (Settings → API Keys)

Potrebná SQL štruktúra tabuľky `providers` je v `supabase/schema.sql`.

## Nasadenie – Cloudflare Pages (zadarmo)

1. Nahraj tento kód do GitHub repozitára (Add file → Upload files, ak nepoužívaš
   git príkazy).
2. Na [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** →
   **Create** → **Pages** → **Connect to Git** → vyber repozitár.
3. Build settings: **Build command** `npm run build`, **Build output directory**
   `dist`.
4. V **Settings → Environment variables** nastav `VITE_SUPABASE_URL` a
   `VITE_SUPABASE_ANON_KEY`.
5. Deploy – Cloudflare pri každej zmene v GitHube appku automaticky znova nasadí.

## Úprava obsahu (bez CMS panelu)

Kategórie, poskytovatelia, lokality a texty webu sú jednotlivé JSON súbory v
priečinku `content/`:

- `content/categories/*.json` – jedna kategória = jeden súbor
- `content/providers/*.json` – jeden poskytovateľ = jeden súbor (nové
  registrácie z formulára sa ale ukladajú do Supabase, nie sem – tieto súbory sú
  len úvodné/ukážkové profily)
- `content/locations.json` – zoznam lokalít
- `content/site.json` – texty a ceny (hero text, cenník, kontaktný e-mail)

Úprava: na GitHube otvor príslušný súbor → klikni na ceruzku (Edit) → zmeň
hodnotu v poli → Commit changes. Cloudflare appku automaticky znova nasadí.

## Čo appka vie

- Katalóg poskytovateľov s filtrom podľa kategórie, lokality a textového
  vyhľadávania (kombinuje ukážkové profily z `content/providers` aj reálne
  registrácie z Supabase)
- Profil poskytovateľa s hodnotením, cenou a kontaktným tlačidlom
- Skutočná registrácia poskytovateľa (uloží sa do Supabase)
- Stránka "Pridať požiadavku" – simulácia zápasovania s poskytovateľmi
- Stránky pre jednotlivé mestské časti/mestá (`/mesto/...`)
- PWA – dá sa "Pridať na plochu" telefónu

## Ďalšie kroky (voliteľné)

- Ukladanie profilovej fotky pri registrácii do Supabase Storage (zatiaľ len
  náhľad v prehliadači, neukladá sa)
- Automatické e-mailové potvrdenie registrácie (napr. cez Resend alebo EmailJS)
- Formulárový admin panel bez potreby upravovať JSON priamo (vyžaduje vlastné
  OAuth prepojenie na GitHub, keďže hostujeme mimo Netlify)
