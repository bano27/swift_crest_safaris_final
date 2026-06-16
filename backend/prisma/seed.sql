-- Swift Crest Safaris – MySQL Seed Data
-- Run: mysql -u root -p swift_crest_safaris < seed.sql

CREATE DATABASE IF NOT EXISTS swift_crest_safaris;
USE swift_crest_safaris;

-- ── Destinations ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS destinations (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  slug         VARCHAR(100) UNIQUE NOT NULL,
  name         VARCHAR(200) NOT NULL,
  region       VARCHAR(200),
  description  TEXT,
  hero_image   VARCHAR(500),
  best_time    VARCHAR(200),
  duration     VARCHAR(100),
  park_fee_adult DECIMAL(8,2) DEFAULT 0,
  park_fee_child DECIMAL(8,2) DEFAULT 0,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO destinations (slug, name, region, description, hero_image, best_time, duration, park_fee_adult, park_fee_child) VALUES
('mara',     'Maasai Mara',      'Narok County',         'Home of the Great Migration and Africa\'s finest Big Five.',    'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900', 'July–October, Jan–Feb', '3–10 Days', 80, 45),
('amboseli', 'Amboseli NP',      'Kajiado County',       'Famous for elephant herds and iconic Kilimanjaro views.',        'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900',   'June–October, Jan–Feb', '3–7 Days',  60, 35),
('samburu',  'Samburu Reserve',  'Northern Kenya',       'Remote wilderness hosting the Samburu Special Five.',            'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=900', 'Year-round',            '3–7 Days',  52, 30),
('nakuru',   'Lake Nakuru',      'Nakuru County',        'Millions of flamingos, white rhinos and tree-climbing lions.',   'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900', 'Year-round, Nov–Jan',   '2–4 Days',  60, 35),
('tsavo',    'Tsavo East & West','Coast & Eastern',      'Kenya\'s largest park — legendary red elephants.',              'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=900', 'June–Sep, Jan–Feb',     '3–8 Days',  52, 30),
('diani',    'Diani Beach',      'Kwale County, Coast',  'Africa\'s best beach — white sand, coral reefs, whale sharks.', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900',   'Jan–Mar, Jul–Oct',      '3–7 Days',  0,  0);

-- ── Camps ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS camps (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  slug           VARCHAR(100) UNIQUE NOT NULL,
  name           VARCHAR(200) NOT NULL,
  category       ENUM('budget','mid-range','luxury') DEFAULT 'mid-range',
  description    TEXT,
  image_url      VARCHAR(500),
  rating         DECIMAL(2,1) DEFAULT 4.0,
  amenities      TEXT,
  destination_id INT,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (destination_id) REFERENCES destinations(id)
);

INSERT INTO camps (slug, name, category, description, image_url, rating, amenities, destination_id) VALUES
-- Mara
('mara-budget',     'Mara Budget Camp',                'budget',    'Simple comfortable camp at affordable price.',                  'https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=600', 3.8, '["En-suite tent","Full board","Campfire","Game drives"]',         1),
('mara-olailepo',   'Mara Olailepo Camp',              'mid-range', 'Mid-range camp with superb views and excellent guiding.',       'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600', 4.2, '["Luxury tents","Swimming pool","Spa","Cultural visits"]',         1),
('enkorok-mara',    'Enkorok Mara Camp',               'mid-range', 'Authentic bush camp, intimate wildlife encounters.',            'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600', 4.4, '["Bush tents","Game drives","Maasai evening","Sundowners"]',       1),
('enkorok-safari',  'Enkorok Safari Camp',             'mid-range', 'Upgraded camp with private game drives.',                      'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600', 4.5, '["Premium tents","Private drives","Pool","Guided walks"]',         1),
('simba-oryx',      'Simba Oryx Camp',                 'mid-range', 'Mara River camp perfect for Migration crossings.',             'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600', 4.3, '["River views","Migration deck","Expert naturalists","Night drives"]',1),
('mara-sopa',       'Mara Sopa Lodge',                 'luxury',    'Award-winning lodge in private conservancy.',                  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',   4.7, '["En-suite rooms","Pool","Spa","Fine dining"]',                   1),
('emayian-luxury',  'Emayian Luxury Camp',             'luxury',    'Ultra-luxury with private plunge pools and butler service.',   'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600', 4.9, '["Plunge pools","Butler","Exclusive conservancy","Helicopter"]',  1),
-- Amboseli
('amboseli-sopa',   'Amboseli Sopa Lodge',             'luxury',    'Iconic lodge at foot of Kilimanjaro.',                         'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600',   4.6, '["Kili views","Pool","Full board","Cultural centre"]',            2),
('ol-tukai',        'Ol Tukai Lodge',                  'luxury',    'Best Kilimanjaro views in the park.',                          'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600',   4.8, '["Kili views","Pool","Game drives","Maasai visits"]',             2),
('kibo-safari',     'Kibo Safari Camp',                'mid-range', 'Comfortable camp with Kilimanjaro views at great value.',      'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600', 4.2, '["Spacious tents","Full board","Game drives","Cultural show"]',   2),
-- Samburu
('samburu-intrepids','Samburu Intrepids Camp',         'luxury',    'Award-winning camp on the Ewaso Nyiro River.',                 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600', 4.7, '["River tents","Pool","Bush breakfast","Night drives"]',          3),
('samburu-sopa',    'Samburu Sopa Lodge',              'mid-range', 'Comfortable lodge overlooking the Ewaso Nyiro.',               'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600', 4.3, '["River rooms","Pool","Full board","Cultural visits"]',           3),
('umoja-samburu',   'Umoja Samburu Camp',              'budget',    'Community-owned budget camp. Authentic hospitality.',          'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600', 3.9, '["Basic tents","Community guides","Cultural visits","Game drives"]',3),
-- Nakuru
('nakuru-sopa',     'Lake Nakuru Sopa Lodge',          'luxury',    'Hilltop lodge with views over Lake Nakuru.',                   'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600', 4.5, '["Lake views","Pool","Full board","Sundowner drives"]',           4),
('sarova-lion-hill','Sarova Lion Hill Lodge',          'luxury',    'Elegant lodge with resident rhinos and tree-climbing lions.',  'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600', 4.6, '["Panoramic views","Pool","Night drives","Rhino trekking"]',      4),
('nakuru-wildlife', 'Nakuru Wildlife Camp',            'budget',    'Budget camp offering great value near the lake.',              'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600', 3.7, '["Basic tents","Full board","Game drives","Flamingo viewing"]',   4),
-- Tsavo
('voi-safari',      'Voi Safari Lodge',                'mid-range', 'Rocky hilltop views of red elephant herds.',                  'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600', 4.2, '["Waterhole views","Pool","Game drives","Sundowner deck"]',       5),
('severin-safari',  'Severin Safari Camp',             'luxury',    'Premium eco-lodge with Kilimanjaro views.',                   'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600', 4.7, '["Eco-luxury tents","Kili views","Pool","Mzima Springs"]',        5),
-- Diani
('baobab-beach',    'Baobab Beach Resort & Spa',       'luxury',    '5-star beachfront resort on the Indian Ocean.',               'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',   4.8, '["Beachfront","Multiple pools","Kids club","Spa","Water sports"]',6),
('diani-reef',      'Diani Reef Beach Resort',         'luxury',    'Iconic resort on one of the world''s top beaches.',           'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',   4.7, '["Private beach","Infinity pool","Scuba diving","Dhow cruises"]', 6),
('sands-nomad',     'The Sands at Nomad',              'luxury',    'Boutique hotel with rooftop bar and snorkelling reef.',        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',   4.6, '["Boutique rooms","Rooftop bar","Snorkelling reef","Kite surfing"]',6);

-- ── Camp Prices ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS camp_prices (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  camp_id        INT NOT NULL,
  season         ENUM('low','shoulder','high') NOT NULL,
  adult_sharing  DECIMAL(10,2) NOT NULL,
  adult_solo     DECIMAL(10,2) NOT NULL,
  child_sharing  DECIMAL(10,2) NOT NULL,
  child_solo     DECIMAL(10,2) NOT NULL,
  meal_plan      VARCHAR(50) DEFAULT 'Full Board',
  UNIQUE KEY unique_camp_season (camp_id, season),
  FOREIGN KEY (camp_id) REFERENCES camps(id)
);

-- Mara Budget Camp prices
INSERT INTO camp_prices (camp_id, season, adult_sharing, adult_solo, child_sharing, child_solo, meal_plan) VALUES
(1,'low',19000,23000,9500,11500,'Full Board'),
(1,'shoulder',24000,29000,12000,14500,'Full Board'),
(1,'high',35000,42000,17500,21000,'Full Board'),
-- Mara Olailepo
(2,'low',22000,22000,11000,11000,'Full Board'),
(2,'shoulder',28000,28000,14000,14000,'Full Board'),
(2,'high',45000,52000,22500,26000,'Full Board'),
-- Enkorok Mara
(3,'low',29400,34800,14700,17400,'Full Board'),
(3,'shoulder',33800,40200,16900,20100,'Full Board'),
(3,'high',58000,68000,29000,34000,'Full Board'),
-- Enkorok Safari
(4,'low',31600,38200,15800,19100,'Full Board'),
(4,'shoulder',37000,42500,18500,21250,'Full Board'),
(4,'high',65000,76000,32500,38000,'Full Board'),
-- Simba Oryx
(5,'low',27900,33400,13950,16700,'Full Board'),
(5,'shoulder',34000,40000,17000,20000,'Full Board'),
(5,'high',55000,65000,27500,32500,'Full Board'),
-- Mara Sopa Lodge
(6,'low',32400,44500,16200,22250,'Full Board'),
(6,'shoulder',39400,51000,19700,25500,'Full Board'),
(6,'high',75000,90000,37500,45000,'Full Board'),
-- Emayian Luxury
(7,'low',43600,58800,21800,29400,'All Inclusive'),
(7,'shoulder',41400,55600,20700,27800,'All Inclusive'),
(7,'high',95000,115000,47500,57500,'All Inclusive'),
-- Amboseli Sopa
(8,'low',28000,38000,14000,19000,'Full Board'),
(8,'shoulder',35000,46000,17500,23000,'Full Board'),
(8,'high',65000,82000,32500,41000,'Full Board'),
-- Ol Tukai
(9,'low',32000,44000,16000,22000,'Full Board'),
(9,'shoulder',40000,54000,20000,27000,'Full Board'),
(9,'high',75000,92000,37500,46000,'Full Board'),
-- Kibo Safari
(10,'low',18000,24000,9000,12000,'Full Board'),
(10,'shoulder',23000,30000,11500,15000,'Full Board'),
(10,'high',42000,55000,21000,27500,'Full Board'),
-- Samburu Intrepids
(11,'low',30000,42000,15000,21000,'Full Board'),
(11,'shoulder',38000,52000,19000,26000,'Full Board'),
(11,'high',72000,90000,36000,45000,'Full Board'),
-- Samburu Sopa
(12,'low',22000,30000,11000,15000,'Full Board'),
(12,'shoulder',28000,38000,14000,19000,'Full Board'),
(12,'high',52000,66000,26000,33000,'Full Board'),
-- Umoja Samburu
(13,'low',15000,20000,7500,10000,'Full Board'),
(13,'shoulder',19000,25000,9500,12500,'Full Board'),
(13,'high',32000,42000,16000,21000,'Full Board'),
-- Nakuru Sopa
(14,'low',25000,35000,12500,17500,'Full Board'),
(14,'shoulder',31000,43000,15500,21500,'Full Board'),
(14,'high',58000,75000,29000,37500,'Full Board'),
-- Sarova Lion Hill
(15,'low',28000,38000,14000,19000,'Full Board'),
(15,'shoulder',35000,47000,17500,23500,'Full Board'),
(15,'high',65000,82000,32500,41000,'Full Board'),
-- Nakuru Wildlife
(16,'low',14000,19000,7000,9500,'Full Board'),
(16,'shoulder',18000,24000,9000,12000,'Full Board'),
(16,'high',30000,40000,15000,20000,'Full Board'),
-- Voi Safari
(17,'low',20000,27000,10000,13500,'Full Board'),
(17,'shoulder',26000,34000,13000,17000,'Full Board'),
(17,'high',48000,62000,24000,31000,'Full Board'),
-- Severin Safari
(18,'low',36000,50000,18000,25000,'All Inclusive'),
(18,'shoulder',45000,62000,22500,31000,'All Inclusive'),
(18,'high',85000,105000,42500,52500,'All Inclusive'),
-- Baobab Beach
(19,'low',42000,58000,21000,29000,'All Inclusive'),
(19,'shoulder',52000,72000,26000,36000,'All Inclusive'),
(19,'high',98000,125000,49000,62500,'All Inclusive'),
-- Diani Reef
(20,'low',35000,48000,17500,24000,'Full Board'),
(20,'shoulder',44000,60000,22000,30000,'Full Board'),
(20,'high',82000,105000,41000,52500,'Full Board'),
-- Sands at Nomad
(21,'low',30000,42000,15000,21000,'Full Board'),
(21,'shoulder',38000,52000,19000,26000,'Full Board'),
(21,'high',70000,90000,35000,45000,'Full Board');

-- ── Bookings table ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  ref            VARCHAR(30) UNIQUE NOT NULL,
  first_name     VARCHAR(100) NOT NULL,
  last_name      VARCHAR(100) NOT NULL,
  email          VARCHAR(255) NOT NULL,
  phone          VARCHAR(50),
  nationality    VARCHAR(100),
  adults         INT DEFAULT 1,
  children       INT DEFAULT 0,
  camp_id        INT,
  arrival        DATE NOT NULL,
  departure      DATE NOT NULL,
  nights         INT NOT NULL,
  season         ENUM('low','shoulder','high') NOT NULL,
  adult_rate_kes DECIMAL(10,2),
  child_rate_kes DECIMAL(10,2),
  total_kes      DECIMAL(12,2) NOT NULL,
  total_usd      DECIMAL(10,2),
  payment_method ENUM('mpesa','card') NOT NULL,
  payment_status ENUM('pending','completed','failed','refunded') DEFAULT 'completed',
  keywords       TEXT,
  notes          TEXT,
  status         ENUM('confirmed','pending','cancelled','completed') DEFAULT 'confirmed',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (camp_id) REFERENCES camps(id)
);

-- ── Contacts table ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(200) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  phone      VARCHAR(50),
  subject    VARCHAR(300),
  message    TEXT NOT NULL,
  replied    BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Users (admin) ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(255) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  name       VARCHAR(200),
  role       ENUM('admin','customer') DEFAULT 'customer',
  phone      VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default admin (password: SwiftCrest@2024!)
-- Run: node -e "const b=require('bcryptjs');console.log(b.hashSync('SwiftCrest@2024!',10))" to regenerate hash
INSERT IGNORE INTO users (email, password, name, role) VALUES
('thairukibe2798@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'admin');

SELECT 'Swift Crest Safaris database seeded successfully!' AS message;
