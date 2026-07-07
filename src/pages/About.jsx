const FAQ = [
  {
    q: 'Ako Buddy funguje?',
    a: 'Popíš, čo potrebuješ (buď priamo v katalógu, alebo pridaním požiadavky) a overení poskytovatelia z Bratislavy a okolia sa ti ozvú s ponukou. Porovnáš profily, hodnotenia a ceny a vyberieš si, kto ti vyhovuje.',
  },
  {
    q: 'Je Buddy pre klientov zadarmo?',
    a: 'Áno, vyhľadávanie, pridanie požiadavky aj kontaktovanie poskytovateľov je pre klientov úplne zadarmo. Platíš len priamo poskytovateľovi za odvedenú prácu.',
  },
  {
    q: 'Ako sú poskytovatelia overovaní?',
    a: 'Každý poskytovateľ má profil s kontaktnými údajmi a hodnoteniami od klientov, takže si vieš urobiť obraz ešte pred prvým kontaktom.',
  },
  {
    q: 'Aké oblasti Buddy pokrýva?',
    a: 'Začíname v Bratislave a Bratislavskom kraji – vo všetkých mestských častiach Bratislavy a okolitých mestách ako Pezinok, Senec, Malacky, Modra, Stupava a Svätý Jur. Postupne plánujeme rozšírenie ďalej.',
  },
  {
    q: 'Aké služby sú v ponuke?',
    a: 'Pokrývame upratovanie, vodoinštalácie, elektrické práce, sťahovanie, maliarske práce, montáž a inštalácie, záhradu, rekonštrukcie, opravu spotrebičov, obklady a dlažby, podlahy, oplotenie, mejkap a krásu, manikúru a pedikúru, aj opatrovanie a asistenciu.',
  },
]

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-stone-900">O Buddy</h1>
      <p className="mt-4 text-stone-600">
        Buddy je katalóg overených odborníkov, ktorí prídu priamo k vám – v Bratislave a Bratislavskom kraji.
        Pokrývame domáce služby, remeselné práce, krásu aj opatrovanie, s cieľom postupne rozširovať ponuku
        podľa toho, o čo bude najväčší záujem.
      </p>
      <h2 className="mt-8 font-semibold text-stone-900">Pre klientov</h2>
      <p className="mt-2 text-stone-600">
        Vyhľadaj službu, porovnaj profily, hodnotenia a orientačné ceny, a kontaktuj poskytovateľa priamo.
        Presnú cenu si dohodnete spolu – Buddy si neberie žiadnu províziu z vašej dohody.
      </p>
      <h2 className="mt-6 font-semibold text-stone-900">Pre poskytovateľov</h2>
      <p className="mt-2 text-stone-600">
        Registrácia je zadarmo a bez záväzkov. Základný profil je vždy bezplatný, Premium profil (7,90 €/mesiac)
        prináša vyššiu viditeľnosť v katalógu.
      </p>

      <h2 className="mt-10 text-xl font-bold text-stone-900">Často kladené otázky</h2>
      <div className="mt-4 space-y-4">
        {FAQ.map((item) => (
          <div key={item.q} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-stone-900">{item.q}</h3>
            <p className="mt-1.5 text-sm text-stone-600">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
