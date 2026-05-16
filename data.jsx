// Mock data for DajUleti prototype

const CATEGORIES = [
  { id: 'prijevoz', name: 'Prijevoz i selidbe', emoji: '📦', color: '#FFD400' },
  { id: 'majstor',  name: 'Sitni majstor',      emoji: '🔧', color: '#FF7A1A' },
  { id: 'ciscenje', name: 'Čišćenje',           emoji: '🧽', color: '#5BC0BE' },
  { id: 'vrt',      name: 'Vrt i dvorište',     emoji: '🌿', color: '#7FB069' },
  { id: 'cuvanje',  name: 'Čuvanje',            emoji: '🐶', color: '#E07A5F' },
  { id: 'ostalo',   name: 'Ostalo',             emoji: '✨', color: '#9E9E9E' },
];

const CITIES = ['Sve gradove', 'Zagreb', 'Split', 'Rijeka', 'Osijek', 'Pula', 'Zadar', 'Varaždin'];

const USERS = {
  u_me:  { id: 'u_me',  name: 'Ti',           avatar: 'TI', city: 'Zagreb',  rating: 4.9, jobs: 12, since: 'Travanj 2026' },
  u_ana: { id: 'u_ana', name: 'Ana K.',       avatar: 'AK', city: 'Zagreb',  rating: 4.8, jobs: 23, since: 'Siječanj 2026' },
  u_mar: { id: 'u_mar', name: 'Marko P.',     avatar: 'MP', city: 'Split',   rating: 4.7, jobs: 8,  since: 'Ožujak 2026' },
  u_ivo: { id: 'u_ivo', name: 'Ivo Š.',  avatar: 'IŠ', city: 'Zagreb', rating: 5.0, jobs: 41, since: 'Studeni 2025' },
  u_lara:{ id: 'u_lara',name: 'Lara M.',      avatar: 'LM', city: 'Rijeka',  rating: 4.6, jobs: 5,  since: 'Veljača 2026' },
  u_dom: { id: 'u_dom', name: 'Domagoj B.',   avatar: 'DB', city: 'Osijek',  rating: 4.9, jobs: 17, since: 'Prosinac 2025' },
  u_nik: { id: 'u_nik', name: 'Nikolina T.',  avatar: 'NT', city: 'Zagreb',  rating: 4.8, jobs: 31, since: 'Listopad 2025' },
  u_jur: { id: 'u_jur', name: 'Jure V.',      avatar: 'JV', city: 'Pula',    rating: 4.5, jobs: 9,  since: 'Travanj 2026' },
};

const GIGS = [
  {
    id: 'g1',
    title: 'Treba mi pomoć oko selidbe iz garsonijere',
    desc:  'Selim se s 3. kata bez lifta na 1. kat u drugu zgradu, udaljeno 2km. Imam krevet, kauč, frizider, par kutija. Trebam dvojicu i kombi. Cca 2-3h posla.',
    cat: 'prijevoz', city: 'Zagreb', area: 'Trešnjevka',
    price: 80, posted: 'prije 12 min', poster: 'u_ana',
    photos: 2, interested: 4, urgency: 'Danas',
  },
  {
    id: 'g2',
    title: 'Ko će mi sastaviti IKEA ormar PAX (2.36m)?',
    desc:  'Kupio sam veliki PAX ormar, sve je u kutijama u sobi. Treba mi netko tko je to već radio i ima alat. Ja ću pomaći ako treba držati.',
    cat: 'majstor', city: 'Split', area: 'Bol',
    price: 35, posted: 'prije 1h', poster: 'u_mar',
    photos: 3, interested: 2, urgency: 'Ovaj tjedan',
  },
  {
    id: 'g3',
    title: 'Generalka stana 60m² prije useljenja',
    desc:  'Prazan stan, treba se sve oprati prije nego donesem stvari. Prozori, kupaona, kuhinja, podovi. Imam sva sredstva kući.',
    cat: 'ciscenje', city: 'Zagreb', area: 'Maksimir',
    price: 90, posted: 'prije 3h', poster: 'u_nik',
    photos: 1, interested: 6, urgency: 'Do petka',
  },
  {
    id: 'g4',
    title: 'Košnja trave + šišanje žive ograde',
    desc:  'Imam kuću s dvorištem cca 200m². Treba pokositi i ošišati živicu sa strane. Ja imam kosilicu, treba donijeti škare za živicu.',
    cat: 'vrt', city: 'Rijeka', area: 'Kantrida',
    price: 50, posted: 'prije 5h', poster: 'u_lara',
    photos: 2, interested: 1, urgency: 'Vikend',
  },
  {
    id: 'g5',
    title: 'Čuvanje dva mačka 5 dana',
    desc:  'Idem na put od 20. do 25. Trebam nekog da dolazi 1x dnevno, nahrani ih, promijeni vodu, očisti pijesak. Vrlo prijatelji mačci.',
    cat: 'cuvanje', city: 'Zagreb', area: 'Centar',
    price: 70, posted: 'prije 8h', poster: 'u_ivo',
    photos: 4, interested: 9, urgency: 'Sljedeći tjedan',
  },
  {
    id: 'g6',
    title: 'Slavina u kuhinji kapa - hitno',
    desc:  'Slavina kapa od jučer, mislim da treba samo brtva. Imam alat osnovni, ali nikad nisam radio. Plaćam odmah po završetku.',
    cat: 'majstor', city: 'Osijek', area: 'Donji grad',
    price: 25, posted: 'prije 1 dan', poster: 'u_dom',
    photos: 1, interested: 3, urgency: 'Hitno',
  },
  {
    id: 'g7',
    title: 'Prevest klavir s 1. kata u kombi',
    desc:  'Imam pijanino (ne klavir, manji), treba ga snijeti niz jedno stubište (12 stepenica) i utovariti u kombi. Trebam dvojicu jakih.',
    cat: 'prijevoz', city: 'Zagreb', area: 'Trnje',
    price: 120, posted: 'prije 1 dan', poster: 'u_nik',
    photos: 2, interested: 5, urgency: 'Subota ujutro',
  },
  {
    id: 'g8',
    title: 'Čuvanje psa preko vikenda',
    desc:  'Mali pas (8kg), super dobar s ljudima. Trebam nekog kod koga može prespavati pet-ned. Plaćam po danu.',
    cat: 'cuvanje', city: 'Pula', area: 'Centar',
    price: 60, posted: 'prije 2 dana', poster: 'u_jur',
    photos: 3, interested: 2, urgency: 'Vikend',
  },
  {
    id: 'g9',
    title: 'Treba mi netko da iznese stari nameštaj na otpad',
    desc:  'Imam kauč i dva ormarića koje treba iznijeti iz stana i odvesti u reciklirno. Stan je na 2. katu, ima lift.',
    cat: 'prijevoz', city: 'Zagreb', area: 'Dubrava',
    price: 65, posted: 'prije 2 dana', poster: 'u_ana',
    photos: 2, interested: 7, urgency: 'Ovaj tjedan',
  },
  {
    id: 'g10',
    title: 'Pomoć oko sadnje povrća u plasteniku',
    desc:  'Imam mali plastenik, treba mi pomoć oko pripreme zemlje i sadnje rajčica i paprika. Sav alat imam.',
    cat: 'vrt', city: 'Varaždin', area: 'Banfica',
    price: 40, posted: 'prije 3 dana', poster: 'u_lara',
    photos: 0, interested: 1, urgency: 'Fleksibilno',
  },
];

// Conversation between "me" (Uletnik) and Ana (poster of g1)
const CHAT_THREAD = {
  gigId: 'g1',
  withUser: 'u_ana',
  messages: [
    { from: 'u_me',  text: 'Bok Ana! Vidim oglas za selidbu, mogu uletit. Imam kombi i često pomognem oko selidbi.', t: '14:22' },
    { from: 'u_ana', text: 'Bok! Super, kad bi mogao? PoČinjem oko 10h ujutro u subotu.', t: '14:25' },
    { from: 'u_me',  text: 'Subota 10h mi paše. Koliko kutija otprilike + nameštaj?', t: '14:26' },
    { from: 'u_ana', text: 'Krevet, kauč (3-sjed), frizider, mali stol i 8-10 kutija. Imam i jednog frenda da pomaže.', t: '14:28' },
    { from: 'u_me',  text: 'Odlično, super smo. Dolazim u 10h. Šalješ mi adresu?', t: '14:29' },
    { from: 'u_ana', text: 'Ozaljska 12, Trešnjevka. Vidimo se u subotu, hvala! 🙌', t: '14:30' },
  ],
};

// My applications and active gigs (for profile)
const MY_APPLICATIONS = [
  { gigId: 'g1', status: 'prihvaćeno', when: 'prije 2h' },
  { gigId: 'g7', status: 'na čekanju', when: 'prije 1 dan' },
  { gigId: 'g4', status: 'na čekanju', when: 'prije 5h' },
];

const MY_POSTED = [
  { gigId: 'g3', interested: 6, status: 'aktivan' },
];

const MY_RATINGS = [
  { from: 'u_ivo', stars: 5, text: 'Brzo, profesionalno, sve dogovoreno. Preporučam!',  when: 'prije 1 tj.' },
  { from: 'u_nik', stars: 5, text: 'Super tip, došao točno na vrijeme. Hvala!',     when: 'prije 2 tj.' },
  { from: 'u_dom', stars: 4, text: 'Sve ok, malo kasnio ali odradio kako treba.',             when: 'prije 1 mj.' },
];

Object.assign(window, {
  CATEGORIES, CITIES, USERS, GIGS, CHAT_THREAD, MY_APPLICATIONS, MY_POSTED, MY_RATINGS,
});
