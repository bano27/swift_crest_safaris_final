import type { Destination, Season, SeasonInfo, Package } from '../types';

export const KES_PER_USD = 130;

export const SEASON_LABELS: Record<Season, SeasonInfo> = {
  low:      { label: 'Low Season',      color: '#27ae60', desc: 'Apr–Jun · Best deals, lush parks, fewer crowds' },
  shoulder: { label: 'Shoulder Season', color: '#f39c12', desc: 'Jan–Mar & Nov · Good wildlife, moderate pricing' },
  high:     { label: 'Peak Season',     color: '#e74c3c', desc: 'Jul–Oct & Dec · Great Migration, peak demand'   },
};

export function detectSeason(dateStr: string): Season {
  if (!dateStr) return 'shoulder';
  const m = new Date(dateStr).getMonth() + 1;
  if (m >= 4 && m <= 6) return 'low';
  if ((m >= 7 && m <= 10) || m === 12) return 'high';
  return 'shoulder';
}

function p(as: number, asol: number, cs: number, csol: number, meal: 'Full Board' | 'All Inclusive') {
  return { adultSharing: as, adultSolo: asol, childSharing: cs, childSolo: csol, mealPlan: meal } as const;
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'mara', name: 'Maasai Mara', region: 'Narok County',
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80',
    description: 'Home of the Great Migration and Africa\'s finest Big Five game viewing — Kenya\'s crown jewel ecosystem.',
    highlights: ['Great Migration (Jul–Oct)', 'Big Five daily', 'Hot air balloons', 'Maasai culture', 'Night drives'],
    bestTime: 'July–October (Migration) · Jan–Feb (Calving)',
    duration: '3–10 Days',
    parkFee: { adultUSD: 80, childUSD: 45 },
    camps: [
      { id:'mara-budget',    name:'Mara Budget Camp',                category:'budget',    rating:3.8, description:'Simple but comfortable tented camp offering authentic Mara experience at an affordable price.',    amenities:['En-suite tent','Full board','Campfire','Game drives'],          imageUrl:'https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=600&q=80', low:p(19000,23000,9500,11500,'Full Board'),  shoulder:p(24000,29000,12000,14500,'Full Board'),  high:p(35000,42000,17500,21000,'Full Board') },
      { id:'mara-olailepo', name:'Mara Olailepo Camp',               category:'mid-range', rating:4.2, description:'Mid-range camp in the heart of the Mara with superb views, spacious tents and excellent guiding.', amenities:['Luxury tents','Swimming pool','Spa','Cultural visits'],             imageUrl:'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', low:p(22000,22000,11000,11000,'Full Board'),  shoulder:p(28000,28000,14000,14000,'Full Board'),  high:p(45000,52000,22500,26000,'Full Board') },
      { id:'enkorok-mara',  name:'Enkorok Mara Camp',                category:'mid-range', rating:4.4, description:'Authentic bush camp offering intimate wildlife encounters, professional guides and Mara sunsets.',  amenities:['Bush tents','Game drives','Maasai evening','Sundowners'],        imageUrl:'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', low:p(29400,34800,14700,17400,'Full Board'),  shoulder:p(33800,40200,16900,20100,'Full Board'),  high:p(58000,68000,29000,34000,'Full Board') },
      { id:'enkorok-safari',name:'Enkorok Safari Camp',              category:'mid-range', rating:4.5, description:'Upgraded safari camp with premium amenities, private game drives and panoramic Mara views.',       amenities:['Premium tents','Private drives','Pool','Guided walks'],          imageUrl:'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600&q=80', low:p(31600,38200,15800,19100,'Full Board'),  shoulder:p(37000,42500,18500,21250,'Full Board'),  high:p(65000,76000,32500,38000,'Full Board') },
      { id:'simba-oryx',    name:'Simba Oryx Camp',                  category:'mid-range', rating:4.3, description:'Perfectly positioned on the Mara River for dramatic wildebeest crossings during Migration.',     amenities:['River views','Migration deck','Expert naturalists','Night drives'],imageUrl:'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&q=80', low:p(27900,33400,13950,16700,'Full Board'),  shoulder:p(34000,40000,17000,20000,'Full Board'),  high:p(55000,65000,27500,32500,'Full Board') },
      { id:'mara-chui',     name:'Mara Chui Camp',                   category:'mid-range', rating:4.4, description:'Named after the leopard. Exceptional big cat sightings and specialist tracker guides.',           amenities:['Luxury tents','Big cat guides','Photo hides','Bush dinners'],    imageUrl:'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=80', low:p(30500,34800,15250,17400,'Full Board'),  shoulder:p(34800,38500,17400,19250,'Full Board'),  high:p(60000,70000,30000,35000,'Full Board') },
      { id:'mara-sopa',     name:'Mara Sopa Lodge',                  category:'luxury',    rating:4.7, description:'Award-winning lodge in private conservancy with panoramic Mara views and exceptional service.',   amenities:['En-suite rooms','Pool','Spa','Fine dining','Private conservancy'],imageUrl:'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80', low:p(32400,44500,16200,22250,'Full Board'),  shoulder:p(39400,51000,19700,25500,'Full Board'),  high:p(75000,90000,37500,45000,'Full Board') },
      { id:'emayian-luxury',name:'Emayian Luxury Camp',              category:'luxury',    rating:4.9, description:'Ultra-luxury with private plunge pools, butler service and exclusive conservancy access.',        amenities:['Plunge pools','Butler','Exclusive conservancy','Helicopter option'],imageUrl:'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80',low:p(43600,58800,21800,29400,'All Inclusive'),shoulder:p(41400,55600,20700,27800,'All Inclusive'),high:p(95000,115000,47500,57500,'All Inclusive') },
    ]
  },
  {
    id: 'amboseli', name: 'Amboseli NP', region: 'Kajiado County',
    heroImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80',
    description: 'Famous for massive elephant herds and the iconic Kilimanjaro backdrop — one of Africa\'s most photographed scenes.',
    highlights: ['Giant elephant herds', 'Kilimanjaro views', 'Observation Hill', 'Maasai culture', 'Birdwatching'],
    bestTime: 'June–October · January–February',
    duration: '3–7 Days',
    parkFee: { adultUSD: 60, childUSD: 35 },
    camps: [
      { id:'amboseli-sopa',  name:'Amboseli Sopa Lodge',         category:'luxury',    rating:4.6, description:'Iconic lodge at the foot of Kilimanjaro with elephant herds passing daily.',      amenities:['Kili views','Pool','Full board','Cultural centre'],             imageUrl:'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80', low:p(28000,38000,14000,19000,'Full Board'), shoulder:p(35000,46000,17500,23000,'Full Board'), high:p(65000,82000,32500,41000,'Full Board') },
      { id:'ol-tukai',       name:'Ol Tukai Lodge',              category:'luxury',    rating:4.8, description:'Lush oasis at the heart of Amboseli — best Kilimanjaro views in the park.',       amenities:['Kili views','Pool','Game drives','Maasai visits'],              imageUrl:'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80', low:p(32000,44000,16000,22000,'Full Board'), shoulder:p(40000,54000,20000,27000,'Full Board'), high:p(75000,92000,37500,46000,'Full Board') },
      { id:'tortilis',       name:'Tortilis Camp',               category:'luxury',    rating:4.9, description:'Exclusive private conservancy camp with the most dramatic Kilimanjaro backdrop.', amenities:['Private conservancy','Butler','Infinity pool','Walking safaris'],imageUrl:'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600&q=80', low:p(45000,62000,22500,31000,'All Inclusive'),shoulder:p(55000,75000,27500,37500,'All Inclusive'),high:p(105000,130000,52500,65000,'All Inclusive') },
      { id:'kibo-safari',    name:'Kibo Safari Camp',            category:'mid-range', rating:4.2, description:'Comfortable tented camp with magnificent Kilimanjaro views at a great value.',   amenities:['Spacious tents','Full board','Game drives','Cultural show'],    imageUrl:'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=80', low:p(18000,24000,9000,12000,'Full Board'),  shoulder:p(23000,30000,11500,15000,'Full Board'), high:p(42000,55000,21000,27500,'Full Board') },
      { id:'amboseli-serena',name:'Amboseli Serena Safari Lodge',category:'luxury',    rating:4.7, description:'Elegant lodge blending with the Amboseli landscape — stunning Kilimanjaro views.',amenities:['Luxe rooms','Pool','Spa','Photography workshops'],            imageUrl:'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', low:p(38000,52000,19000,26000,'Full Board'), shoulder:p(48000,64000,24000,32000,'Full Board'), high:p(88000,108000,44000,54000,'Full Board') },
    ]
  },
  {
    id: 'samburu', name: 'Samburu Reserve', region: 'Northern Kenya',
    heroImage: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=900&q=80',
    description: 'Remote northern wilderness hosting the Samburu Special Five — species found nowhere else on Earth.',
    highlights: ['Samburu Special Five', 'Reticulated giraffe', 'Grevy\'s zebra', 'Ewaso Nyiro River', 'Cultural dances'],
    bestTime: 'Year-round · Best Jul–Sep',
    duration: '3–7 Days',
    parkFee: { adultUSD: 52, childUSD: 30 },
    camps: [
      { id:'samburu-intrepids',name:'Samburu Intrepids Camp',    category:'luxury',    rating:4.7, description:'Award-winning camp on the Ewaso Nyiro — elephants and crocodiles visit daily.',   amenities:['River tents','Pool','Bush breakfast','Night drives'],          imageUrl:'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600&q=80', low:p(30000,42000,15000,21000,'Full Board'), shoulder:p(38000,52000,19000,26000,'Full Board'), high:p(72000,90000,36000,45000,'Full Board') },
      { id:'samburu-serena',   name:'Samburu Serena Lodge',      category:'luxury',    rating:4.6, description:'Striking thatched lodge on the Ewaso Nyiro surrounded by doum palms.',           amenities:['River view','Pool','Cultural dances','Game drives'],           imageUrl:'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', low:p(35000,48000,17500,24000,'Full Board'), shoulder:p(44000,59000,22000,29500,'Full Board'), high:p(82000,100000,41000,50000,'Full Board') },
      { id:'elephant-bedroom', name:'Elephant Bedroom Camp',     category:'luxury',    rating:4.9, description:'Exclusive 12-tent camp where elephants stroll between your tent and the river.', amenities:['Private conservancy','Butler','Night drives','Walking safaris'],imageUrl:'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=80', low:p(48000,65000,24000,32500,'All Inclusive'),shoulder:p(58000,78000,29000,39000,'All Inclusive'),high:p(110000,135000,55000,67500,'All Inclusive') },
      { id:'samburu-sopa',     name:'Samburu Sopa Lodge',        category:'mid-range', rating:4.3, description:'Comfortable lodge overlooking the Ewaso Nyiro with great wildlife viewing.',     amenities:['River rooms','Pool','Full board','Cultural visits'],           imageUrl:'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', low:p(22000,30000,11000,15000,'Full Board'), shoulder:p(28000,38000,14000,19000,'Full Board'), high:p(52000,66000,26000,33000,'Full Board') },
      { id:'umoja-samburu',    name:'Umoja Samburu Camp',        category:'budget',    rating:3.9, description:'Community-owned budget camp giving back to Samburu families — authentic hospitality.',amenities:['Basic tents','Community guides','Cultural visits','Game drives'],imageUrl:'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=80', low:p(15000,20000,7500,10000,'Full Board'), shoulder:p(19000,25000,9500,12500,'Full Board'), high:p(32000,42000,16000,21000,'Full Board') },
    ]
  },
  {
    id: 'nakuru', name: 'Lake Nakuru', region: 'Nakuru County',
    heroImage: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80',
    description: 'Kenya\'s most accessible park — millions of flamingos, white rhinos, tree-climbing lions, and leopards.',
    highlights: ['Flamingo flocks', 'White & black rhinos', 'Tree-climbing lions', 'Baboon Cliff', 'Lake Elementaita'],
    bestTime: 'Year-round · Best Nov–Jan',
    duration: '2–4 Days',
    parkFee: { adultUSD: 60, childUSD: 35 },
    camps: [
      { id:'nakuru-sopa',      name:'Lake Nakuru Sopa Lodge',    category:'luxury',    rating:4.5, description:'Hilltop lodge with sweeping views over Lake Nakuru and its flamingo-studded shores.',amenities:['Lake views','Pool','Full board','Sundowner drives'],          imageUrl:'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', low:p(25000,35000,12500,17500,'Full Board'), shoulder:p(31000,43000,15500,21500,'Full Board'), high:p(58000,75000,29000,37500,'Full Board') },
      { id:'sarova-lion-hill', name:'Sarova Lion Hill Lodge',    category:'luxury',    rating:4.6, description:'Elegant lodge on a private hill with resident rhinos and tree-climbing lions nearby.',amenities:['Panoramic views','Pool','Night drives','Rhino trekking'],    imageUrl:'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', low:p(28000,38000,14000,19000,'Full Board'), shoulder:p(35000,47000,17500,23500,'Full Board'), high:p(65000,82000,32500,41000,'Full Board') },
      { id:'nakuru-wildlife',  name:'Nakuru Wildlife Camp',      category:'budget',    rating:3.7, description:'Budget-friendly camp outside the park offering great value and easy lake access.',  amenities:['Basic tents','Full board','Game drives','Flamingo viewing'],  imageUrl:'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', low:p(14000,19000,7000,9500,'Full Board'),  shoulder:p(18000,24000,9000,12000,'Full Board'),  high:p(30000,40000,15000,20000,'Full Board') },
    ]
  },
  {
    id: 'tsavo', name: 'Tsavo East & West', region: 'Coast & Eastern',
    heroImage: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=900&q=80',
    description: 'Kenya\'s largest park — legendary red elephants, Mzima Springs, Lugard Falls, and vast untouched wilderness.',
    highlights: ['Red elephants', 'Mzima Springs', 'Lugard Falls', 'Shetani Lava', 'Night drives'],
    bestTime: 'June–September · January–February',
    duration: '3–8 Days',
    parkFee: { adultUSD: 52, childUSD: 30 },
    camps: [
      { id:'voi-safari',    name:'Voi Safari Lodge',       category:'mid-range', rating:4.2, description:'Rocky hilltop lodge with iconic views of red elephant herds at the waterhole.',    amenities:['Waterhole views','Pool','Game drives','Sundowner deck'],     imageUrl:'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=80', low:p(20000,27000,10000,13500,'Full Board'), shoulder:p(26000,34000,13000,17000,'Full Board'), high:p(48000,62000,24000,31000,'Full Board') },
      { id:'severin-safari',name:'Severin Safari Camp',    category:'luxury',    rating:4.7, description:'Premium eco-lodge in Tsavo West with solar power and spectacular Kilimanjaro views.',amenities:['Eco-luxury tents','Kili views','Pool','Mzima Springs'],      imageUrl:'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', low:p(36000,50000,18000,25000,'All Inclusive'),shoulder:p(45000,62000,22500,31000,'All Inclusive'),high:p(85000,105000,42500,52500,'All Inclusive') },
      { id:'tsavo-red',     name:'Tsavo Red Elephant Camp',category:'budget',    rating:3.8, description:'Rustic bush camp offering raw wilderness and unforgettable red elephant sightings.', amenities:['Bush tents','Expert guides','Night drives','Lugard Falls'],  imageUrl:'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=80', low:p(16000,22000,8000,11000,'Full Board'), shoulder:p(20000,27000,10000,13500,'Full Board'), high:p(36000,48000,18000,24000,'Full Board') },
    ]
  },
  {
    id: 'diani', name: 'Diani Beach', region: 'Kwale County, Coast',
    heroImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80',
    description: 'Africa\'s best beach — pristine white sand, warm Indian Ocean, coral reefs, whale sharks and perfect post-safari relaxation.',
    highlights: ['White sand beaches', 'Coral reef snorkelling', 'Whale shark dives', 'Dhow cruises', 'Colobus monkeys'],
    bestTime: 'January–March · July–October',
    duration: '3–7 Days',
    parkFee: { adultUSD: 0, childUSD: 0 },
    camps: [
      { id:'baobab-beach',name:'Baobab Beach Resort & Spa',category:'luxury',rating:4.8,description:'Award-winning 5-star beachfront resort with stunning Indian Ocean views.',              amenities:['Beachfront','Multiple pools','Kids club','Spa','Water sports'],imageUrl:'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80', low:p(42000,58000,21000,29000,'All Inclusive'),shoulder:p(52000,72000,26000,36000,'All Inclusive'),high:p(98000,125000,49000,62500,'All Inclusive') },
      { id:'diani-reef',  name:'Diani Reef Beach Resort',  category:'luxury',rating:4.7,description:'Iconic resort on one of the world\'s top beaches with luxury rooms and water sports.', amenities:['Private beach','Infinity pool','Scuba diving','Dhow cruises'],imageUrl:'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80', low:p(35000,48000,17500,24000,'Full Board'), shoulder:p(44000,60000,22000,30000,'Full Board'), high:p(82000,105000,41000,52500,'Full Board') },
      { id:'sands-nomad', name:'The Sands at Nomad',       category:'luxury',rating:4.6,description:'Boutique luxury hotel with individually designed rooms and a rooftop bar.',             amenities:['Boutique rooms','Rooftop bar','Snorkelling reef','Kite surfing'],imageUrl:'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80', low:p(30000,42000,15000,21000,'Full Board'), shoulder:p(38000,52000,19000,26000,'Full Board'), high:p(70000,90000,35000,45000,'Full Board') },
    ]
  },
];

export const FLAT_PACKAGES: Package[] = DESTINATIONS.flatMap(d =>
  d.camps.map(c => ({
    id: `${d.id}__${c.id}`,
    name: c.name,
    destinationId: d.id,
    destinationName: d.name,
    campId: c.id,
    campName: c.name,
    category: c.category,
    duration: d.duration,
    priceFromKES: c.low.adultSharing,
    priceFromUSD: Math.round(c.low.adultSharing / KES_PER_USD),
  }))
);
