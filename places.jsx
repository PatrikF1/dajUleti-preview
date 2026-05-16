// Sva mjesta u Hrvatskoj — 128 gradova + 428 općina
// Format: { name, type: 'grad' | 'opcina', cnt: <županija> }
// Sortirano po imenu unutar svake županije

const PLACES_RAW = {
  'Zagreb': {
    gradovi: ['Zagreb'],
    opcine:  [],
  },
  'Zagrebačka': {
    gradovi: ['Dugo Selo','Ivanić-Grad','Jastrebarsko','Samobor','Sveta Nedelja','Sveti Ivan Zelina','Velika Gorica','Vrbovec','Zaprešić'],
    opcine:  ['Bedenica','Bistra','Brckovljani','Brdovec','Dubrava','Dubravica','Farkaševac','Gradec','Jakovlje','Klinča Sela','Kloštar Ivanić','Krašić','Kravarsko','Križ','Luka','Marija Gorica','Orle','Pisarovina','Pokupsko','Preseka','Pušća','Rakovec','Rugvica','Stupnik','Žumberak'],
  },
  'Krapinsko-zagorska': {
    gradovi: ['Donja Stubica','Klanjec','Krapina','Oroslavje','Pregrada','Zabok','Zlatar'],
    opcine:  ['Bedekovčina','Budinščina','Desinić','Đurmanec','Gornja Stubica','Hrašćina','Hum na Sutli','Jesenje','Konjščina','Kraljevec na Sutli','Krapinske Toplice','Kumrovec','Lobor','Mače','Marija Bistrica','Mihovljan','Novi Golubovec','Petrovsko','Radoboj','Stubičke Toplice','Sveti Križ Začretje','Tuhelj','Veliko Trgovišće','Zagorska Sela','Zlatar Bistrica'],
  },
  'Sisačko-moslavačka': {
    gradovi: ['Glina','Hrvatska Kostajnica','Kutina','Novska','Petrinja','Popovača','Sisak'],
    opcine:  ['Donji Kukuruzari','Dvor','Gvozd','Hrvatska Dubica','Jasenovac','Lekenik','Lipovljani','Majur','Martinska Ves','Sunja','Topusko','Velika Ludina'],
  },
  'Karlovačka': {
    gradovi: ['Duga Resa','Karlovac','Ogulin','Ozalj','Slunj'],
    opcine:  ['Barilović','Bosiljevo','Cetingrad','Draganić','Generalski Stol','Josipdol','Kamanje','Krnjak','Lasinja','Netretić','Plaški','Rakovica','Ribnik','Saborsko','Tounj','Vojnić','Žakanje'],
  },
  'Varaždinska': {
    gradovi: ['Ivanec','Lepoglava','Ludbreg','Novi Marof','Varaždin','Varaždinske Toplice'],
    opcine:  ['Bednja','Beretinec','Breznica','Breznički Hum','Cestica','Donja Voća','Gornji Kneginec','Jalžabet','Klenovnik','Ljubeščica','Mali Bukovec','Martijanec','Maruševec','Petrijanec','Sračinec','Sveti Đurđ','Sveti Ilija','Trnovec Bartolovečki','Veliki Bukovec','Vidovec','Vinica','Visoko'],
  },
  'Koprivničko-križevačka': {
    gradovi: ['Đurđevac','Koprivnica','Križevci'],
    opcine:  ['Drnje','Đelekovec','Ferdinandovac','Gola','Gornja Rijeka','Hlebine','Kalinovac','Kalnik','Kloštar Podravski','Koprivnički Bregi','Koprivnički Ivanec','Legrad','Molve','Novigrad Podravski','Novo Virje','Peteranec','Podravske Sesvete','Rasinja','Sokolovac','Sveti Ivan Žabno','Sveti Petar Orehovec','Virje'],
  },
  'Bjelovarsko-bilogorska': {
    gradovi: ['Bjelovar','Čazma','Daruvar','Garešnica','Grubišno Polje'],
    opcine:  ['Berek','Dežanovac','Đulovac','Hercegovac','Ivanska','Kapela','Končanica','Nova Rača','Rovišće','Severin','Sirač','Šandrovac','Štefanje','Velika Pisanica','Velika Trnovitica','Veliki Grđevac','Veliko Trojstvo','Zrinski Topolovac'],
  },
  'Primorsko-goranska': {
    gradovi: ['Bakar','Cres','Crikvenica','Čabar','Delnice','Kastav','Kraljevica','Krk','Mali Lošinj','Novi Vinodolski','Opatija','Rab','Rijeka','Vrbovsko'],
    opcine:  ['Baška','Brod Moravice','Čavle','Dobrinj','Fužine','Jelenje','Klana','Kostrena','Lokve','Lopar','Lovran','Malinska-Dubašnica','Matulji','Mošćenička Draga','Mrkopalj','Omišalj','Punat','Ravna Gora','Skrad','Vinodolska','Viškovo','Vrbnik'],
  },
  'Ličko-senjska': {
    gradovi: ['Gospić','Novalja','Otočac','Senj'],
    opcine:  ['Brinje','Donji Lapac','Karlobag','Lovinac','Perušić','Plitvička Jezera','Udbina','Vrhovine'],
  },
  'Virovitičko-podravska': {
    gradovi: ['Orahovica','Slatina','Virovitica'],
    opcine:  ['Crnac','Čačinci','Čađavica','Gradina','Lukač','Mikleuš','Nova Bukovica','Pitomača','Sopje','Suhopolje','Špišić Bukovica','Voćin','Zdenci'],
  },
  'Požeško-slavonska': {
    gradovi: ['Kutjevo','Lipik','Pakrac','Pleternica','Požega'],
    opcine:  ['Brestovac','Čaglin','Jakšić','Kaptol','Velika'],
  },
  'Brodsko-posavska': {
    gradovi: ['Nova Gradiška','Slavonski Brod'],
    opcine:  ['Bebrina','Brodski Stupnik','Bukovlje','Cernik','Davor','Donji Andrijevci','Dragalić','Garčin','Gornja Vrba','Gornji Bogićevci','Gundinci','Klakar','Nova Kapela','Okučani','Oprisavci','Oriovac','Podcrkavlje','Rešetari','Sibinj','Sikirevci','Slavonski Šamac','Stara Gradiška','Staro Petrovo Selo','Velika Kopanica','Vrbje','Vrpolje'],
  },
  'Zadarska': {
    gradovi: ['Benkovac','Biograd na Moru','Nin','Obrovac','Pag','Zadar'],
    opcine:  ['Bibinje','Galovac','Gračac','Jasenice','Kali','Kolan','Kukljica','Lišane Ostrovičke','Novigrad','Pakoštane','Pašman','Polača','Poličnik','Posedarje','Povljana','Preko','Privlaka','Ražanac','Sali','Stankovci','Starigrad','Sukošan','Sveti Filip i Jakov','Škabrnja','Tkon','Vir','Vrsi','Zemunik Donji'],
  },
  'Osječko-baranjska': {
    gradovi: ['Beli Manastir','Belišće','Donji Miholjac','Đakovo','Našice','Osijek','Valpovo'],
    opcine:  ['Antunovac','Bilje','Bizovac','Čeminac','Čepin','Darda','Donja Motičina','Draž','Drenje','Đurđenovac','Erdut','Ernestinovo','Feričanci','Gorjani','Jagodnjak','Kneževi Vinogradi','Koška','Levanjska Varoš','Magadenovac','Marijanci','Petlovac','Petrijevci','Podgorač','Podravska Moslavina','Popovac','Punitovci','Satnica Đakovačka','Semeljci','Strizivojna','Šodolovci','Trnava','Viljevo','Viškovci','Vladislavci','Vuka'],
  },
  'Šibensko-kninska': {
    gradovi: ['Drniš','Knin','Skradin','Šibenik','Vodice'],
    opcine:  ['Bilice','Biskupija','Civljane','Ervenik','Kijevo','Kistanje','Murter-Kornati','Pirovac','Primošten','Promina','Rogoznica','Ružić','Tisno','Tribunj','Unešić'],
  },
  'Vukovarsko-srijemska': {
    gradovi: ['Ilok','Otok','Vinkovci','Vukovar','Županja'],
    opcine:  ['Andrijaševci','Babina Greda','Bogdanovci','Borovo','Bošnjaci','Cerna','Drenovci','Gradište','Gunja','Ivankovo','Jarmina','Lovas','Markušica','Negoslavci','Nijemci','Nuštar','Privlaka','Stari Jankovci','Stari Mikanovci','Štitar','Tompojevci','Tordinci','Tovarnik','Trpinja','Vođinci','Vrbanja'],
  },
  'Splitsko-dalmatinska': {
    gradovi: ['Hvar','Imotski','Kaštela','Komiža','Makarska','Omiš','Sinj','Solin','Split','Stari Grad','Supetar','Trilj','Trogir','Vis','Vrgorac','Vrlika'],
    opcine:  ['Baška Voda','Bol','Brela','Cista Provo','Dicmo','Dugi Rat','Dugopolje','Gradac','Hrvace','Jelsa','Klis','Lećevica','Lokvičići','Lovreć','Marina','Milna','Muć','Nerežišća','Okrug','Otok (Dalmacija)','Podbablje','Podgora','Podstrana','Postira','Prgomet','Primorski Dolac','Proložac','Pučišća','Runovići','Seget','Selca','Sućuraj','Sutivan','Šestanovac','Šolta','Tučepi','Zadvarje','Zagvozd','Zmijavci'],
  },
  'Istarska': {
    gradovi: ['Buje','Buzet','Labin','Novigrad','Pazin','Poreč','Pula','Rovinj','Umag','Vodnjan'],
    opcine:  ['Bale','Barban','Brtonigla','Cerovlje','Fažana','Funtana','Gračišće','Grožnjan','Kanfanar','Karojba','Kaštelir-Labinci','Kršan','Lanišće','Ližnjan','Marčana','Medulin','Motovun','Oprtalj','Pićan','Raša','Sveta Nedelja (Istra)','Sveti Lovreč','Sveti Petar u Šumi','Svetvinčenat','Tar-Vabriga','Tinjan','Višnjan','Vižinada','Vrsar','Žminj'],
  },
  'Dubrovačko-neretvanska': {
    gradovi: ['Dubrovnik','Korčula','Metković','Opuzen','Ploče'],
    opcine:  ['Blato','Dubrovačko Primorje','Janjina','Konavle','Kula Norinska','Lastovo','Lumbarda','Mljet','Orebić','Pojezerje','Slivno','Smokvica','Ston','Trpanj','Vela Luka','Zažablje','Župa Dubrovačka'],
  },
  'Međimurska': {
    gradovi: ['Čakovec','Mursko Središće','Prelog'],
    opcine:  ['Belica','Dekanovec','Domašinec','Donja Dubrava','Donji Kraljevec','Donji Vidovec','Goričan','Gornji Mihaljevec','Kotoriba','Mala Subotica','Nedelišće','Orehovica','Podturen','Pribislavec','Selnica','Strahoninec','Sveta Marija','Sveti Juraj na Bregu','Sveti Martin na Muri','Šenkovec','Štrigova','Vratišinec'],
  },
};

// Flat array sorted alphabetically: { name, type, cnt, key }
const PLACES = (() => {
  const flat = [];
  for (const [cnt, { gradovi, opcine }] of Object.entries(PLACES_RAW)) {
    for (const g of gradovi) flat.push({ name: g, type: 'grad',  cnt, key: 'g:'+g });
    for (const o of opcine)  flat.push({ name: o, type: 'opcina',cnt, key: 'o:'+o });
  }
  flat.sort((a, b) => a.name.localeCompare(b.name, 'hr'));
  return flat;
})();

// Counts for hint text
const PLACES_COUNT = {
  gradovi: PLACES.filter(p => p.type === 'grad').length,
  opcine:  PLACES.filter(p => p.type === 'opcina').length,
};

// Big-city pinned list used as quick chips when picker first opens
const PLACES_POPULAR = ['Zagreb','Split','Rijeka','Osijek','Zadar','Pula','Slavonski Brod','Karlovac','Varaždin','Šibenik','Dubrovnik','Velika Gorica'];

Object.assign(window, { PLACES, PLACES_RAW, PLACES_COUNT, PLACES_POPULAR });
