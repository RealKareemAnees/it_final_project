/**
 * Shared Mock Data and Utilities for CarWiki Static Refactor
 */

const MOCK_CARS = JSON.parse(`[
  {
    "name": "Toyota Corolla",
    "type": "Sedan",
    "manufacturer": "Toyota",
    "year": 2023,
    "images": [
      "https://media.ed.edmunds-media.com/toyota/corolla/2026/oem/2026_toyota_corolla_sedan_xse_fq_oem_2_500.jpg",
      "https://media.ed.edmunds-media.com/toyota/corolla/2026/oem/2026_toyota_corolla_sedan_xse_rq_oem_2_500.jpg",
      "https://media.ed.edmunds-media.com/toyota/corolla/2026/oem/2026_toyota_corolla_sedan_xse_rq_oem_3_500.jpg"
    ],
    "description": "The Toyota Corolla is one of the best-selling and most recognizable sedans in automotive history, and the 2023 model continues that legendary tradition with modern refinements that make it more compelling than ever. Built on Toyota's TNGA-C platform, the Corolla offers a level of structural rigidity and ride quality that punches well above its price class. Under the hood, buyers can choose between a 2.0-liter dynamic-force four-cylinder engine producing 169 horsepower, or a highly efficient 1.8-liter hybrid powertrain that delivers exceptional fuel economy exceeding 50 mpg in city driving. The interior is thoughtfully designed with a driver-focused cockpit, featuring a standard 8-inch touchscreen infotainment system compatible with Apple CarPlay and Android Auto. Higher trims elevate the experience with a 10.5-inch display and a premium JBL audio system. Safety has always been a Corolla hallmark, and the 2023 model comes standard with Toyota Safety Sense 3.0, which includes pre-collision warning with pedestrian and cyclist detection, lane departure alert, automatic high beams, and radar cruise control. The suspension tuning strikes a confident balance between comfort and agility, making the Corolla equally at home on a daily commute or a weekend highway run. Cabin space is generous for the segment, with comfortable seating for five adults and a practical 13.1 cubic-foot trunk. Available in multiple trim levels — L, LE, SE, XLE, and XSE — there is a Corolla configuration for virtually every buyer. Low cost of ownership, a reputation for near-bulletproof reliability, and strong resale values make the Toyota Corolla one of the smartest investments in the compact sedan segment. Whether you are a first-time buyer or a seasoned driver looking for a dependable daily companion, the Corolla delivers consistency, comfort, and confidence mile after mile.",
    "country": "Japan",
    "tags": ["sedan", "fuel-efficient", "reliable", "family car", "compact", "daily driver", "Toyota", "affordable"],
    "price": 20000,
    "localID": 1
  },
  {
    "name": "Honda Civic",
    "type": "Sedan",
    "manufacturer": "Honda",
    "year": 2023,
    "images": [
      "https://images.unsplash.com/photo-1570303278489-041bd897a873?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9uZGElMjBjaXZpYyUyMHR5cGUlMjByfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1689988833264-a52ca57fa88c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvbmRhJTIwY2l2aWMlMjB0eXBlJTIwcnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1636915860623-57b9b74133e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9uZGElMjBjaXZpYyUyMHR5cGUlMjByfGVufDB8fDB8fHww"
    ],
    "description": "The 2023 Honda Civic stands as a benchmark in the compact car segment, blending striking modern design with practical engineering and an engaging driving experience that few rivals can match. The eleventh-generation Civic underwent a dramatic redesign, shedding the polarizing styling of its predecessor for clean, sophisticated lines inspired by Honda's premium Acura brand. The result is a car that looks expensive at a price point that remains highly accessible. Powertrain choices include a naturally aspirated 2.0-liter four-cylinder producing 158 horsepower for the standard trims, and a turbocharged 1.5-liter engine generating 192 horsepower in Sport and Touring variants, giving the Civic a genuinely spirited character on the open road. The interior is one of the strongest in the class — an uncluttered dashboard with a large 9-inch touchscreen, physical climate controls, and high-quality soft-touch materials create an environment that feels premium well beyond the Civic's price. Honda Sensing, the brand's comprehensive suite of active safety technologies, comes standard across all trims and includes collision mitigation braking, road departure mitigation, adaptive cruise control, and lane keeping assist. The Civic also shines in practicality: the trunk offers a class-leading 14.8 cubic feet of cargo space, and rear-seat legroom comfortably accommodates taller passengers. Available as both a sedan and a sporty hatchback, the Civic caters to a wide spectrum of preferences. The Type R variant, Honda's range-topping performance model, produces 315 horsepower and has set lap records at circuits worldwide. The standard Civic's sharp steering, well-tuned suspension, and direct handling response give even ordinary driving an elevated feel. With its combination of style, versatility, safety, and genuine driver appeal, the 2023 Honda Civic continues to earn its place as one of the world's most loved compact cars.",
    "country": "Japan",
    "tags": ["sedan", "compact", "sporty", "fuel-efficient", "Honda", "turbocharged", "daily driver", "modern design"],
    "price": 22000,
    "localID": 2,
    "threeDfile": "honda_civic_type-r.glb"
  },
  {
    "name": "BMW X5",
    "type": "SUV",
    "manufacturer": "BMW",
    "year": 2024,
    "images": [
      "https://images.unsplash.com/photo-1653227158553-ddaa680cdd65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym13JTIweDV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1652453456487-f5be1b89a38b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ym13JTIweDV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1637913071927-7969c41ac85c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJtdyUyMHg1fGVufDB8fDB8fHww"
    ],
    "description": "The 2024 BMW X5 is the definitive expression of what a luxury midsize SUV should be — commanding in presence, thrilling to drive, and impeccably appointed inside. Now in its fourth generation, the X5 has become a cornerstone of BMW's lineup and a benchmark against which all premium SUVs are measured. The base xDrive40i pairs a turbocharged 3.0-liter inline six-cylinder engine with BMW's smooth eight-speed automatic transmission, delivering 335 horsepower and the ability to sprint from zero to 60 mph in just 5.3 seconds. For those demanding more, the X5 M60i houses a twin-turbocharged 4.4-liter V8 generating 523 horsepower and a ferocious 553 lb-ft of torque. A plug-in hybrid xDrive50e variant is also available, blending a turbocharged six-cylinder with an electric motor for a combined output exceeding 483 horsepower and a meaningful electric-only driving range for city commuters. Inside, the 2024 X5 introduces BMW's latest Curved Display — a sweeping panel integrating a 12.3-inch instrument cluster with a 14.9-inch infotainment screen running iDrive 8 — creating a cockpit that is simultaneously futuristic and intuitive. Massaging seats, a panoramic sky lounge LED roof, Bowers & Wilkins Diamond surround sound, and four-zone climate control are among the many available options that push the X5 into ultra-luxury territory. Standard features include wireless Apple CarPlay and Android Auto, over-the-air software updates, and a comprehensive array of driver assistance systems under the BMW Driving Assistant Professional suite. The air suspension system adapts continuously to road conditions, delivering a ride that is supple at highway speeds yet taut and engaging on a mountain pass. With available third-row seating and a 33.9 cubic-foot cargo hold, the X5 also meets genuine family hauling needs. It is a complete package: powerful, luxurious, practical, and dynamically outstanding.",
    "country": "Germany",
    "tags": ["luxury SUV", "BMW", "powerful", "all-wheel drive", "premium", "family SUV", "turbocharged", "technology"],
    "price": 60000,
    "localID": 3,
    "threeDfile": "2024_bmw_x5_xdrive40i.glb"
  },
  {
    "name": "Mercedes C-Class",
    "type": "Sedan",
    "manufacturer": "Mercedes-Benz",
    "year": 2024,
    "images": [
      "https://media.ed.edmunds-media.com/mercedes-benz/c-class/2020/oem/2020_mercedes-benz_c-class_convertible_amg-c-63-s_fq_oem_1_500.jpg",
      "https://media.ed.edmunds-media.com/mercedes-benz/c-class/2020/oem/2020_mercedes-benz_c-class_coupe_amg-c-43_fq_oem_3_500.jpg",
      "https://media.ed.edmunds-media.com/mercedes-benz/c-class/2020/oem/2020_mercedes-benz_c-class_coupe_amg-c-63-s_fq_oem_3_500.jpg"
    ],
    "description": "The 2024 Mercedes-Benz C-Class represents the pinnacle of what a compact luxury sedan can achieve, setting new standards for interior opulence, driving refinement, and technological sophistication in its class. The latest W206-generation C-Class draws heavily from its larger sibling, the S-Class, borrowing design cues, technology, and a sense of occasion that makes every journey feel elevated. Exterior styling is sleek and assertive, featuring a long hood, muscular haunches, and a refined face dominated by a prominent three-pointed star grille. Inside, the transformation is dramatic: an 11.9-inch portrait-oriented MBUX touchscreen dominates the center console, tilted towards the driver for ergonomic ease, while a 12.3-inch digital instrument cluster completes the dual-screen cockpit. The system runs the latest MBUX software with natural language voice control, augmented reality navigation, and seamless smartphone integration. The interior itself is draped in quality materials — genuine wood, polished aluminum, ambient lighting available in 64 colors, and optional Nappa leather upholstery make the cabin feel genuinely special. Under the hood, the C300 sedan is powered by a turbocharged 2.0-liter four-cylinder producing 255 horsepower, mated to a nine-speed automatic transmission. Mild hybrid technology is standard, integrating a 48-volt system for improved efficiency and smoother starts. The AMG C43 steps up with a turbocharged 3.0-liter inline six producing 402 horsepower, while the C63 S E Performance AMG variant combines a turbocharged four-cylinder with an electric motor for a combined output of 671 horsepower — making it one of the most powerful compact sedans ever built. The C-Class rides on a sophisticated multi-link suspension that isolates road imperfections with class-leading finesse. With optional air suspension and rear-wheel steering, it handles with composure and confidence. Driver assistance features include adaptive cruise control, active lane keeping, blind-spot monitoring, and automatic emergency braking as standard equipment. The 2024 C-Class is unmistakably a Mercedes — prestigious, refined, and deeply desirable.",
    "country": "Germany",
    "tags": ["luxury sedan", "Mercedes-Benz", "premium", "turbocharged", "MBUX", "AMG", "elegant", "technology"],
    "price": 55000,
    "localID": 4,
    "threeDfile": "mercedes-benz_c-class_2020.glb"
  },
  {
    "name": "Ford Mustang",
    "type": "Sports",
    "manufacturer": "Ford",
    "year": 2023,
    "images": [
      "https://media.gettyimages.com/id/459388679/photo/roush-ford-mustang-2010.jpg?s=612x612&w=0&k=20&c=VZlYEd_nsmke950CHkYKldTS0X2bCJ3kHhaUlKpNSPc=",
      "https://images.unsplash.com/photo-1547744152-14d985cb937f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9yZCUyMG11c3Rhbmd8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1616612357450-95b84d42f21a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvcmQlMjBtdXN0YW5nfGVufDB8fDB8fHww"
    ],
    "description": "The Ford Mustang is more than a car — it is an American cultural icon that has symbolized freedom, power, and rebellious spirit since its debut in 1964. The 2023 seventh-generation Mustang marks a significant milestone, retaining the classic pony car formula while introducing the most advanced technology and performance capabilities in the nameplate's history. Sculpted with bold, aggressive lines that pay homage to classic Mustangs while projecting a decidedly modern stance, the exterior communicates performance before you even turn the key. Two engine options anchor the lineup: the naturally aspirated 5.0-liter Coyote V8, producing a thunderous 480 horsepower with an exhaust note that has become as recognizable as any sound in the automotive world, and the turbocharged 2.3-liter EcoBoost four-cylinder generating 315 horsepower — both mated to either a six-speed manual or a ten-speed automatic transmission. The GT Performance Package adds Brembo brakes, a Torsen limited-slip differential, and summer tires for maximum track capability. Inside, the Mustang enters the digital age with a 12.4-inch digital instrument cluster and a 13.2-inch SYNC 4 portrait touchscreen — the largest ever fitted to a Mustang. Drive modes including Normal, Sport, Track, Drag, and Drift allow the driver to dramatically alter the car's behavior to suit the moment. The new Mustang also introduces a rev-matching function for the manual gearbox and electronic line-lock for professional drag strip launches. The Dark Horse variant, a new apex predator in the lineup, features a hand-assembled 5.0-liter producing 500 horsepower, unique chassis tuning, and exclusive aerodynamic elements. Active exhaust, magnetic ride control, and Brembo six-piston front calipers make it the most track-capable production Mustang short of the Shelby GT500. The 2023 Mustang is the perfect synthesis of heritage and innovation — unmistakably American, undeniably thrilling.",
    "country": "USA",
    "tags": ["sports car", "muscle car", "V8", "American", "Ford", "rear-wheel drive", "iconic", "performance"],
    "price": 45000,
    "localID": 5,
    "threeDfile": "ford_mustang_roush_2019_-_stage_3.glb"
  },
  {
    "name": "Chevrolet Camaro",
    "type": "Sports",
    "manufacturer": "Chevrolet",
    "year": 2023,
    "images": [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hldnJvbGV0JTIwY2FtYXJvfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1562911791-472321d62247?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hldnJvbGV0JTIwY2FtYXJvfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1607764750075-8f38797f94e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZXZyb2xldCUyMGNhbWFyb3xlbnwwfHwwfHx8MA%3D%3D"
    ],
    "description": "The Chevrolet Camaro has been locked in the definitive American muscle car rivalry with the Ford Mustang for over five decades, and the 2023 model represents the sixth-generation platform at its most refined and performance-focused. Built on GM's Alpha rear-wheel-drive platform — the same architecture underpinning the Cadillac CT4-V and CT5-V — the Camaro benefits from a rigid, lightweight structure that contributes to its exceptional handling dynamics. The lineup opens with a turbocharged 2.0-liter four-cylinder producing 275 horsepower, a responsive engine that makes the base Camaro an entertaining daily sports car. The V6-powered 3LT trim adds 335 horsepower and a glorious exhaust note. At the top of the naturally aspirated hierarchy, the SS model's 6.2-liter LT1 V8 generates 455 horsepower and 455 lb-ft of torque, capable of dispatching the zero-to-60 mph sprint in under four seconds with the optional performance package. The crown jewel is the ZL1 — powered by the supercharged 6.2-liter LT4 V8 producing 650 horsepower — making it one of the most powerful production pony cars ever built. The 1LE track package, available on V6, SS, and ZL1 variants, transforms the Camaro into a genuine track weapon with magnetic ride control, Multimatic DSSV spool-valve dampers, and unique aerodynamic enhancements. The interior, while functional, has been criticized as tight and visibility-limited — but this is the trade-off for a dramatically low roofline that gives the Camaro its predatory visual stance. The 2023 cockpit introduces an updated 8-inch infotainment system with wireless Apple CarPlay. The Recaro sport seats provide excellent lateral support during spirited driving. The Camaro is a driver's car first, a comfort machine second — and for enthusiasts who prioritize visceral performance and handling precision, it remains one of the most rewarding vehicles money can buy.",
    "country": "USA",
    "tags": ["muscle car", "sports car", "V8", "American", "Chevrolet", "rear-wheel drive", "high performance", "track ready"],
    "price": 43000,
    "localID": 6,
    "threeDfile": "chevrolet_camaro_ss__free.glb"
  },
  {
    "name": "Hyundai Elantra",
    "type": "Sedan",
    "manufacturer": "Hyundai",
    "year": 2023,
    "images": [
      "https://images.unsplash.com/photo-1716384277872-5d102002d4d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8SHl1bmRhaSUyMEVsYW50cmF8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1629678212150-d928baa670f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SHl1bmRhaSUyMEVsYW50cmF8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1728031401344-40811b71840c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8SHl1bmRhaSUyMEVsYW50cmF8ZW58MHx8MHx8fDA%3D"
    ],
    "description": "The 2023 Hyundai Elantra is a bold statement that affordable does not mean ordinary. Winner of numerous design and value awards since its seventh-generation debut, the Elantra has completely shed its reputation as a bland economy car and emerged as one of the most visually striking and feature-rich vehicles in the compact sedan segment. Hyundai's Parametric Dynamics design language gives the Elantra a futuristic, almost geometric appearance with sharp body creases, a fastback-inspired roofline, and angular LED lighting signatures that make it instantly recognizable in traffic. Powertrain choices suit a range of driving styles: the standard 2.0-liter naturally aspirated engine produces 147 horsepower paired with a continuously variable transmission, delivering smooth city driving and respectable fuel economy. The turbocharged 1.6-liter in the N Line and Sport trims outputs 201 horsepower with a seven-speed dual-clutch transmission for a noticeably more engaging experience. At the top of the performance hierarchy, the Elantra N features a 276-horsepower turbocharged engine, an eight-speed dual-clutch or six-speed manual transmission, launch control, and an electronic limited-slip differential — making it one of the hottest hot hatches masquerading as a sedan in the market today. Despite its sporty aspirations, the Elantra remains supremely practical. The cabin seats five comfortably, with generous rear legroom that outpaces many rivals. The 14.2 cubic-foot trunk is class competitive, and the list of standard technology features is remarkable for the price: an 8-inch touchscreen, wireless Apple CarPlay and Android Auto, a wireless charging pad, and Hyundai SmartSense safety suite with blind-spot monitoring and rear cross-traffic alert come as standard on mid and upper trims. The Elantra proves that smart design, strong safety, and solid value can coexist beautifully.",
    "country": "South Korea",
    "tags": ["sedan", "affordable", "stylish", "compact", "Hyundai", "fuel-efficient", "technology", "sporty"],
    "price": 19000,
    "localID": 7,
    "threeDfile": "2021_hyundai_elantra.glb"
  },
  {
    "name": "Kia Sportage",
    "type": "SUV",
    "manufacturer": "Kia",
    "year": 2024,
    "images": [
      "https://images.unsplash.com/photo-1688893287874-ac7fbd686c24?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2lhJTIwc3BvcnRhZ2V8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1688893288248-3338b8491a46?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2lhJTIwc3BvcnRhZ2V8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1692370793611-7724a38ab701?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGtpYSUyMHNwb3J0YWdlfGVufDB8fDB8fHww"
    ],
    "description": "The 2024 Kia Sportage is a remarkably accomplished compact SUV that has matured into one of the class leaders, delivering a compelling blend of bold design, advanced technology, practical versatility, and value that is difficult to match at its price point. The fifth-generation Sportage made waves at its reveal with a daring design language — an angular, distinctive body featuring opposing boomerang-shaped LED lights, a tiger-nose grille transformed into a wide parametric jewel pattern, and a muscular silhouette that communicates confidence without ostentation. Inside, the transformation is equally dramatic: a curved 12.3-inch instrument display flows seamlessly into a 12.3-inch infotainment touchscreen, creating a panoramic cockpit that feels genuinely premium. Dual wireless phone charging, ventilated front seats, and a Meridian sound system are available on higher trims. The 2024 Sportage offers a choice of powertrains: a 2.5-liter naturally aspirated four-cylinder producing 187 horsepower covers most buyers' needs, while a turbocharged 1.6-liter engine in the Sportage X-Pro and X-Pro Prestige delivers 281 horsepower — a substantial upgrade for drivers who enjoy spirited performance. A plug-in hybrid variant rated at 261 horsepower total combined output is also available, with a useful all-electric range of approximately 34 miles making it excellent for urban drivers seeking reduced fuel costs. Standard front-wheel drive and available all-wheel drive with multiple terrain drive modes — including sand, mud, snow, and rock — make the Sportage adaptable across varied conditions. Kia's comprehensive suite of driver assistance features includes forward collision avoidance assist, lane keeping assist, driver attention warning, and smart cruise control across most trims. Cargo capacity of 39.6 cubic feet behind the rear seats and 74.1 cubic feet with seats folded provides excellent everyday hauling ability. The Kia Sportage has genuinely grown up, and the 2024 model is proof that mainstream compact SUVs can be exciting, feature-rich, and eminently practical all at once.",
    "country": "South Korea",
    "tags": ["compact SUV", "Kia", "advanced technology", "all-wheel drive", "family SUV", "turbocharged", "plug-in hybrid", "value"],
    "price": 27000,
    "localID": 8,
    "threeDfile": "kia_sportage.glb"
  },
  {
    "name": "Audi A6",
    "type": "Sedan",
    "manufacturer": "Audi",
    "year": 2024,
    "images": [
      "https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXVkaSUyMGE2fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1503507420689-7b961cc77da5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXVkaSUyMGE2fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1572199109282-442d26b37fa6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF1ZGklMjBhNnxlbnwwfHwwfHx8MA%3D%3D"
    ],
    "description": "The 2024 Audi A6 is the embodiment of sophisticated German engineering — a full-size executive sedan that masterfully balances athletic performance with refined comfort and some of the most advanced in-car technology available in its segment. The A6's exterior design is timelessly elegant, characterized by Audi's evolutionary design philosophy: a wide Singleframe grille, sharp matrix LED headlights, sculptural flanks, and a fastback-inspired roofline that gives it a four-door coupe silhouette. It is a car that commands attention without resorting to aggression. At the heart of the A6 lineup sits a turbocharged 2.0-liter four-cylinder producing 261 horsepower, while the 3.0-liter turbocharged V6 in the Premium Plus and Prestige trims outputs 335 horsepower, enabling a zero-to-60 mph time of 5.1 seconds. Audi's legendary quattro all-wheel drive system is standard, distributing power intelligently between all four wheels for supreme traction in all conditions. A mild hybrid system integrating a 48-volt starter-generator is part of every drivetrain, recovering energy under braking and enabling engine-off coasting for improved fuel efficiency. The interior of the A6 is where Audi truly excels. The MMI touch response dual touchscreen system — featuring an upper 10.1-inch display for navigation and infotainment and a lower 8.6-inch display for climate and vehicle functions — presents a clean, layered interface that operates with minimal tactile distraction. Seat surfaces in Valcona leather, open-pore wood inlays, aluminum trim, and four-zone climate control elevate the cabin to near-luxury SUV standards. The Bang & Olufsen 3D sound system, available as an option, transforms the cabin into a concert hall. Standard driver assistance features include adaptive cruise assist, active lane assist, traffic jam assist, and a 360-degree surround-view camera. Rear seat comfort matches or exceeds many competitors in the class, with ample legroom and available massage functions for long-haul executives. The A6 represents the ideal blend of technological leadership, understated luxury, and dynamic excellence.",
    "country": "Germany",
    "tags": ["luxury sedan", "Audi", "quattro AWD", "executive", "turbocharged", "premium", "technology", "elegant"],
    "price": 58000,
    "localID": 9,
    "threeDfile": "audi_a6_c7_limousine.glb"
  },
  {
    "name": "Tesla Model 3",
    "type": "Electric",
    "manufacturer": "Tesla",
    "year": 2024,
    "images": [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVzbGElMjBtb2RlbDN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1561580125-028ee3bd62eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVzbGElMjBtb2RlbDN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1635777076506-a3a44a999bb2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRlc2xhJTIwbW9kZWwzfGVufDB8fDB8fHww"
    ],
    "description": "The 2024 Tesla Model 3 Highland — the redesigned version of Tesla's best-selling electric sedan — represents a significant refinement of an already compelling package, addressing many of the criticisms of earlier generations while doubling down on the technological and performance advantages that made the Model 3 the world's best-selling electric car. The exterior facelift is subtle but meaningful: revised front and rear fascias, a cleaner glasshouse, and new wheel designs give the Model 3 a more premium, mature appearance that aligns it more closely with luxury sedan rivals. Inside, the transformation is dramatic. A redesigned dashboard now features a 15.4-inch central touchscreen as the sole interface point — controlling everything from climate to vehicle dynamics — accompanied by a new heads-up display projected onto the windshield for essential driving information. Rear seat passengers receive their own 8-inch entertainment screen, a first for the Model 3. The Highland also brings significantly improved interior quality: improved acoustic glass, enhanced noise insulation, ambient lighting, and new seat designs with ventilation and heating make the cabin a genuinely pleasant place to spend time. The Long Range RWD variant achieves an EPA-rated 341 miles of range on a single charge, making range anxiety a non-issue for the vast majority of journeys. The Performance model, equipped with dual motors and all-wheel drive, launches from zero to 60 mph in an astonishing 3.1 seconds — rivaling dedicated sports cars costing twice as much. Regenerative braking, over-the-air software updates, and access to Tesla's Supercharger network — the largest and most reliable fast-charging infrastructure in the world — cement the Model 3's leadership in the EV segment. Tesla's Autopilot system comes standard, with Full Self-Driving capability available as an optional subscription upgrade. The Model 3 is not just the electric car of the moment — it is a glimpse at the future of personal transportation.",
    "country": "USA",
    "tags": ["electric vehicle", "Tesla", "zero emission", "autopilot", "long range", "performance EV", "sedan", "technology"],
    "price": 40000,
    "localID": 10,
    "threeDfile": "tesla_model_3.glb"
  },
  {
    "name": "Tesla Model X",
    "type": "Electric SUV",
    "manufacturer": "Tesla",
    "year": 2024,
    "images": [
      "https://images.unsplash.com/photo-1587304878169-505d63fd6b0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVzbGElMjBtb2RlbCUyMHh8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1587304878428-1b533030e0e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVzbGElMjBtb2RlbCUyMHh8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1652509197980-9f3d9ac7916e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVzbGElMjBtb2RlbCUyMHh8ZW58MHx8MHx8fDA%3D"
    ],
    "description": "The 2024 Tesla Model X is one of the most technologically advanced and distinctive family SUVs on the road today, instantly recognizable for its iconic falcon-wing rear doors — a dramatic engineering feat that opens vertically and requires as little as 11 inches of space on each side to deploy, making them practical even in tight parking garages. This engineering showstopper also grants access to the second and third rows with a grace that conventional doors simply cannot match. Built on a dual-motor all-wheel drive platform, the standard Model X Long Range produces 670 miles of combined motor output with an EPA-rated range of 348 miles — the longest range of any electric SUV available today. The Model X Plaid, with its tri-motor powertrain and over 1,020 horsepower, accelerates from zero to 60 mph in a staggering 2.5 seconds, making it one of the fastest production SUVs ever built regardless of fuel type. Inside, the Model X accommodates up to seven passengers across three rows, with the optional six-seat configuration offering a more luxurious captain-chair second row. The panoramic windshield extends over the front passengers' heads in an aircraft-style design, dramatically expanding the sense of airiness and space in the cabin. A redesigned yoke steering wheel and the centrally mounted 17-inch landscape touchscreen replace traditional controls in typical Tesla fashion. The rear 8-inch entertainment screen, tri-zone climate control, and optional HEPA filtration system — capable of removing 99.97% of particulate matter — make the Model X one of the most comfortable long-haul family vehicles available. Tesla's Autopilot and optional Full Self-Driving package, combined with the Supercharger network, make the Model X uniquely capable for both urban daily use and long-distance road trips. It is unlike anything else on the road — futuristic, fast, and genuinely family-friendly.",
    "country": "USA",
    "tags": ["electric SUV", "Tesla", "falcon-wing doors", "high performance", "long range", "family SUV", "autopilot", "luxury EV"],
    "price": 90000,
    "localID": 11,
    "threeDfile": "tesla_model_x_2020.glb"
  },
  {
    "name": "Nissan Altima",
    "type": "Sedan",
    "manufacturer": "Nissan",
    "year": 2023,
    "images": [
      "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlzc2FuJTIwYWx0aW1hfGVufDB8fDB8fHww",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLY33dYjFIbeffDR0z_fn_0WpPFZNmHT-Y3Q&s",
      "https://images.unsplash.com/photo-1609250687610-95d4f56261a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmlzc2FuJTIwYWx0aW1hfGVufDB8fDB8fHww"
    ],
    "description": "The 2023 Nissan Altima continues to define the sweet spot of the midsize sedan market — an intelligent, comfortable, and well-equipped car that prioritizes real-world usability and long-distance comfort over flashy performance metrics. The Altima's exterior has a flowing, confident presence: the distinctive V-motion grille, boomerang LED headlights, and aerodynamic silhouette give it a refined look that holds up well against comparably priced competitors from Honda and Toyota. A key differentiator for the Altima is Nissan's available Intelligent All-Wheel Drive system — a feature rare in this segment — making the Altima an attractive choice for buyers in regions with harsh winter conditions. The standard powertrain is a naturally aspirated 2.5-liter four-cylinder producing 188 horsepower, tuned for efficiency and smooth power delivery rather than outright performance. A turbocharged 2.0-liter VC-Turbo variable compression ratio engine generating 248 horsepower is available in SR and Platinum trims, representing a genuine technological breakthrough — the world's first production variable compression ratio engine, able to dynamically alter the compression ratio between 8:1 and 14:1 for optimal balance of performance and efficiency depending on driving conditions. The continuously variable transmission in both variants is among the most refined in the industry, contributing to a seamlessly smooth driving experience. Interior quality has taken meaningful strides in recent generations: available Ultrasuede trim, genuine wood accents, a 9-inch touchscreen with wireless Apple CarPlay, and heated and ventilated leather seats on top trims create a cabin that feels genuinely premium. The Altima's ride quality is particularly noteworthy — Nissan's suspension tuning absorbs bumps with impressive composure, making it an excellent long-distance touring companion. ProPilot Assist, Nissan's hands-on single-lane driving assistance system, and the Nissan Safety Shield 360 suite come standard or available across the lineup. Roomy, refined, and thoughtfully equipped, the Altima is a sensible choice with a quiet dose of technological ambition.",
    "country": "Japan",
    "tags": ["midsize sedan", "Nissan", "all-wheel drive", "comfortable", "variable compression engine", "family car", "fuel-efficient", "spacious"],
    "price": 24000,
    "localID": 12,
    "threeDfile": "2019_nissan_altima.glb"
  },
  {
    "name": "Mazda CX-5",
    "type": "SUV",
    "manufacturer": "Mazda",
    "year": 2024,
    "images": [
      "https://images.unsplash.com/photo-1743114713466-f12a85992a75?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TWF6ZGElMjBDWC01fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1743114713456-0d53a90182aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWF6ZGElMjBDWC01fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1713924787703-ed674cef7807?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWF6ZGElMjBDWC01fGVufDB8fDB8fHww"
    ],
    "description": "The 2024 Mazda CX-5 occupies a unique and enviable position in the compact SUV segment — it is the enthusiast's choice, the designer's pick, and a quiet champion of the idea that practical family transport can still stir the soul. Mazda's Kodo: Soul of Motion design language reaches a high point in the CX-5, producing a vehicle whose sculpted body panels, confident stance, and sophisticated detailing make it one of the best-looking SUVs at any price. Unlike rivals that chase maximum interior screen real estate, Mazda engineers the CX-5 around driver engagement and operational simplicity: a central rotary commander control manages most infotainment functions without requiring drivers to reach across the cabin and touch a screen while moving. The standard 2.5-liter naturally aspirated four-cylinder engine produces 187 horsepower and pairs with Mazda's smooth six-speed automatic transmission and available i-Activ AWD — an intelligent all-wheel drive system that proactively distributes torque before wheel slip occurs. For those seeking more performance, the 2.5 Turbo engine delivers 256 horsepower on premium fuel — 227 on regular — and 320 lb-ft of torque, transforming the CX-5 into a genuinely quick compact SUV with a zero-to-60 mph time around 5.7 seconds. The interior prioritizes quality of materials over sheer quantity of features: Nappa leather, real wood trim, genuine metal accents, and a Bose 10-speaker sound system on top trims create a cabin atmosphere that rivals SUVs costing significantly more. Mazda's i-Activsense safety suite includes radar cruise control, lane-keep assist, and automatic emergency braking as standard across the lineup. The suspension tuning is the finest in the segment — Mazda's engineers achieve a handling precision and ride comfort balance that makes rivals feel either too soft or too harsh. The CX-5 is proof that a mainstream compact SUV can be genuinely beautiful, deeply enjoyable to drive, and quietly premium — a car that gets better the more you pay attention to it.",
    "country": "Japan",
    "tags": ["compact SUV", "Mazda", "stylish", "all-wheel drive", "turbocharged", "driver focused", "premium interior", "fuel-efficient"],
    "price": 28000,
    "localID": 13,
    "threeDfile": "mazda_cx-5_2020.glb"
  },
  {
    "name": "Volkswagen Golf",
    "type": "Hatchback",
    "manufacturer": "Volkswagen",
    "year": 2025,
    "images": [
      "https://images.unsplash.com/photo-1572811298797-9eecadf6cb24?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Vm9sa3N3YWdlbiUyMEdvbGZ8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1591230740238-e9a71182b67c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Vm9sa3N3YWdlbiUyMEdvbGZ8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1724620961935-ee922e2dfad5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFZvbGtzd2FnZW4lMjBHb2xmfGVufDB8fDB8fHww"
    ],
    "description": "The Volkswagen Golf is arguably the definitive European compact hatchback — a car that has shaped the segment since 1974 and continues, in its eighth generation, to set the benchmark for what a well-rounded compact car should be. The 2025 Golf receives a significant mid-cycle refresh that introduces a revised front fascia with redesigned matrix LED headlights, updated bumpers, and a cleaner overall appearance that subtly elevates its premium character. Inside, the Golf's cabin reflects Volkswagen's commitment to sophisticated simplicity: a 10.25-inch digital instrument cluster, a 12.9-inch IDA infotainment touchscreen, and an updated control structure with slider-type controls for climate and volume reduce touch-screen overload while maintaining technological currency. The seat comfort and interior refinement — materials quality, acoustic sealing, and build precision — remain best-in-class for the segment. Engine choices for 2025 include a 1.5-liter eTSI mild hybrid producing 150 horsepower and a 2.0-liter TSI turbocharged engine with 265 horsepower in the Golf GTI — the performance benchmark for hot hatches worldwide. The Golf GTI's chassis, with its XDS electronic limited-slip differential, adaptive dampers, and revised suspension geometry, produces handling that is precise, playful, and deeply satisfying on a challenging road. The Golf R, the range-topping variant, produces 333 horsepower through its 4MOTION all-wheel drive system and can reach 60 mph from standstill in 4.7 seconds. The standard Golf's ride quality, noise isolation, and motorway refinement rival vehicles from higher segments — long-distance touring in a Golf feels relaxed and effortless. Cargo capacity of 381 liters behind the rear seats expands to 1,237 liters with seats folded, making it a genuine everyday workhorse. Travel Assist provides semi-automated driving on the motorway, combining adaptive cruise control and lane centering for reduced fatigue on long journeys. Few cars in history have balanced engagement, practicality, refinement, and efficiency as consistently as the Volkswagen Golf — the 2025 model continues that proud legacy.",
    "country": "Germany",
    "tags": ["hatchback", "Volkswagen", "GTI", "compact", "turbocharged", "European", "practical", "sporty"],
    "price": 23000,
    "localID": 14,
    "threeDfile": "2025_volkswagen_golf_r.glb"
  },
  {
    "name": "Peugeot 3008",
    "type": "SUV",
    "manufacturer": "Peugeot",
    "year": 2024,
    "images": [
      "https://www.topgear.com/sites/default/files/cars-car/image/2024/09/PEUGEOT_3008_EXT_13.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzwM5nsvg6AsS3c6mxOkLVdQVH3bxLiP5zvcMWFgog7w&s",
      "https://www.regal-motors.co.uk/img/new-cars/new-3008/New-3008-Banner-1.jpg"
    ],
    "description": "The 2024 Peugeot 3008 enters a bold new chapter in its evolution, adopting a completely new platform, fresh design language, and an electrified powertrain lineup that positions it as one of the most forward-thinking compact SUVs in the European market. Peugeot's Stellantis STLA Medium platform underpins this new generation, enabling the 3008 to offer both plug-in hybrid and fully electric variants alongside traditional combustion options — making it one of the most powertrain-diverse SUVs in its class. The new design is striking and unmistakably French: the 3008 adopts a coupe-SUV silhouette with a sloping roofline, frameless door windows, and a distinctive front face defined by Peugeot's lion claw LED daytime running lights. It is a genuinely beautiful car that stands apart from the homogeneous SUV crowd. Inside, the famous Peugeot i-Cockpit evolves to new heights: a panoramic 21-inch curved screen sweeps across the dashboard, integrating the digital instrument cluster and infotainment system into a seamless visual arc — one of the most dramatic and immersive cockpit designs in any car at this price. Physical shortcuts along the lower edge of the display maintain quick-access functionality. The electric variant — called the E-3008 — is powered by a 73 kWh battery offering up to 527 km of WLTP-rated range, making it one of the longest-range electric compact SUVs available in Europe. Fast charging at 160 kW replenishes the battery from 20% to 80% in around 25 minutes. A dual-motor, all-wheel drive variant producing 320 horsepower is available for performance-oriented buyers. Plug-in hybrid variants pair a 1.2-liter turbocharged petrol engine with electric motors for a total output of 195 or 300 horsepower, with an electric-only range exceeding 60 km for city commuters. Peugeot's suite of Level 2 driver assistance features, including highway driving assist with hands-free capability on compatible roads, raises the 3008's technology credentials significantly. The 2024 Peugeot 3008 is proof that European SUV design can be genuinely expressive, technologically ambitious, and powerfully electrified.",
    "country": "France",
    "tags": ["compact SUV", "Peugeot", "electric", "plug-in hybrid", "French design", "long range", "stylish", "advanced technology"],
    "price": 30000,
    "localID": 15,
    "threeDfile": "peugeot_3008.glb"
  },
  {
    "name": "Renault Megane",
    "type": "Hatchback",
    "manufacturer": "Renault",
    "year": 2023,
    "images": [
      "https://images.unsplash.com/photo-1594502225401-a9eab8b405dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmVuYXVsdCUyME1lZ2FuZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1679398175192-92238aac595b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UmVuYXVsdCUyME1lZ2FuZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1725184812214-801067b44863?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFJlbmF1bHQlMjBNZWdhbmV8ZW58MHx8MHx8fDA%3D"
    ],
    "description": "The Renault Megane E-Tech Electric is one of Europe's most thoughtfully conceived and executed electric hatchbacks, representing Renault's most ambitious shift toward electrification and a genuine reimagining of what a modern family compact car can be. Built on the new CMF-EV platform developed jointly with Nissan and Mitsubishi, the Megane E-Tech Electric adopts a sleek, low-slung profile with a crossover-inflected raised ride height that gives it versatile road presence without sacrificing the compact dimensions that make it easy to park and maneuver in dense urban environments. The exterior is characterized by sculpted flanks, a flush door handle design, aerodynamically optimized 18- to 20-inch wheel options, and a distinctive LED lighting signature that makes the Megane immediately recognizable in traffic. Inside, Renault introduces the OpenR Link system — a vertically oriented 12-inch portrait touchscreen powering Google built-in services including Google Maps navigation, Google Assistant voice control, and access to a growing ecosystem of Android-compatible applications. This is accompanied by a 12.3-inch horizontal digital instrument display, creating an immersive dual-screen driver environment with intuitive layout. Battery options include a standard 40 kWh unit offering around 300 km of WLTP range, and a larger 60 kWh variant extending range to approximately 470 km — sufficient for the vast majority of real-world driving patterns. Charging capability reaches 130 kW DC fast charging, enabling a meaningful range top-up in under 30 minutes. The drivetrain offers either 130 or 220 horsepower in front-wheel drive configuration, with the more powerful variant delivering spirited performance befitting the Megane's sporty heritage. Renault's chassis tuning for the Megane E-Tech is notably sophisticated: low-speed ride comfort is excellent, while higher-speed dynamics reveal a composed, confidence-inspiring handling character. Five-star Euro NCAP safety rating, generous standard equipment, and a competitive price position the Megane E-Tech Electric as one of the most intelligent choices in the European compact electric segment.",
    "country": "France",
    "tags": ["hatchback", "Renault", "electric", "compact", "European", "Google built-in", "family car", "efficient"],
    "price": 21000,
    "localID": 16,
    "threeDfile": "2010_renault_megane_rs_250_cup.glb"
  },
  {
    "name": "BMW X6",
    "type": "Sports Activity Coupe",
    "manufacturer": "BMW",
    "year": 2023,
    "images": [
      "https://images.unsplash.com/photo-1676409429433-503d95c21ac4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym13JTIweDZ8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1676409429142-179800faa044?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym13JTIweDZ8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1676409428414-aa7c43fcafdc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym13JTIweDZ8ZW58MHx8MHx8fDA%3D"
    ],
    "description": "The 2023 BMW X6 is the original and definitive Sports Activity Coupe — a segment that BMW invented in 2008 and has continued to refine into one of the most visually distinctive and dynamically capable luxury vehicles money can buy. The X6 sits on the same CLAR platform as its X5 sibling but adopts a dramatically sloping roofline that sacrifices some rear headroom and cargo space in exchange for an aggressive, coupe-like silhouette that makes an unmistakable style statement. Its imposing front end, featuring BMW's large Iconic Glow kidney grille available with illuminated surround lighting, gives the X6 a road presence that commands attention on any street. Engine choices are generously powerful: the xDrive40i pairs a turbocharged 3.0-liter inline six-cylinder with the xDrive all-wheel drive system for 335 horsepower and a zero-to-60 mph time of 5.1 seconds. The xDrive50i, powered by a twin-turbocharged 4.4-liter V8, elevates output to 523 horsepower and enables a 4.3-second sprint to 60 mph. The X6 M Competition, the apex performance variant, extracts 617 horsepower from its hand-assembled M S63 V8 engine, launching the SUV coupe to 60 mph in just 3.8 seconds with a top speed electronically limited to 190 mph — making it one of the fastest SUVs in production. Handling, despite the considerable mass, is genuinely athletic thanks to standard air suspension, available integral active steering at all four wheels, and active anti-roll stabilization. The interior is BMW's finest: Curved Display integrating a 12.3-inch instrument cluster and 14.9-inch touchscreen, Merino leather seating, Bowers & Wilkins Diamond surround sound, and a heated steering wheel in exotic materials for top trim configurations. The X6 is a statement vehicle — bold, powerful, polarizing, and proud. For those who want an SUV that refuses to blend in, it remains the most compelling choice in its unique class.",
    "country": "Germany",
    "tags": ["sports activity coupe", "BMW", "luxury SUV", "powerful", "V8", "all-wheel drive", "coupe SUV", "premium"],
    "price": 77000,
    "localID": 17,
    "threeDfile": "2015_bmw_x6_f16.glb"
  },
  {
    "name": "Lamborghini Huracan",
    "type": "Supercar",
    "manufacturer": "Lamborghini",
    "year": 2024,
    "images": [
      "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TGFtYm9yZ2hpbmklMjBIdXJhY2FufGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TGFtYm9yZ2hpbmklMjBIdXJhY2FufGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1657769106786-b6f50ac90f5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fExhbWJvcmdoaW5pJTIwSHVyYWNhbnxlbnwwfHwwfHx8MA%3D%3D"
    ],
    "description": "The Lamborghini Huracán represents the last of a dying breed — a naturally aspirated, mid-engine supercar without turbochargers, electrification, or the smoothing influence of driver aids designed to make the experience more accessible. It is raw, visceral, and utterly uncompromising, and that is precisely what makes it extraordinary. The 5.2-liter naturally aspirated V10 engine mounted behind the driver is the heart of the Huracán experience: it produces 630 horsepower in the standard configuration and revs to a screaming 8,500 RPM redline with a mechanical howl that is widely considered among the finest engine sounds in the world. In the Huracán STO — the Super Trofeo Omologata — Lamborghini delivers a street-legal racing car producing 640 horsepower with rear-wheel drive, a front splitter, rear wing, and a massive NACA duct feeding the engine bay. Zero to 60 mph in 3.0 seconds and a top speed of 310 km/h are the headline figures, but the driving experience transcends numbers. The Piattaforma Inerziale (LPI) uses GPS and six-axis inertial measurement to continuously calculate the car's dynamic state, feeding the information to the LDVI (Lamborghini Dinamica Veicolo Integrata) brain that coordinates all dynamic systems. The resulting car communicates with the driver with startling transparency — you know exactly how much grip is available, exactly where the limit is, exactly how the car will respond to your inputs. The carbon fiber monocoque construction results in a dry weight below 1,340 kg, contributing to its extraordinary agility. Scissor doors, a hexagonal design motif, and an aviation-inspired cockpit make it as spectacular to look at as it is to drive. Bespoke Ad Personam customization allows virtually unlimited exterior and interior personalization. The Huracán is not merely a car — it is an emotional event, a mechanical masterpiece, and an automotive icon that will be cherished long after the last one rolls off the Sant'Agata Bolognese production line.",
    "country": "Italy",
    "tags": ["supercar", "Lamborghini", "V10", "naturally aspirated", "mid-engine", "rear-wheel drive", "track car", "exotic"],
    "price": 200000,
    "localID": 18,
    "threeDfile": "lamborghini_huracan.glb"
  },
  {
    "name": "Ferrari 488",
    "type": "Supercar",
    "manufacturer": "Ferrari",
    "year": 2023,
    "images": [
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RmVycmFyaSUyMDQ4OHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1615440321449-83897161d806?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RmVycmFyaSUyMDQ4OHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1597935370784-051cdebbe6a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEZlcnJhcmklMjA0ODh8ZW58MHx8MHx8fDA%3D"
    ],
    "description": "The Ferrari 488 Pista — the track-focused pinnacle of the 488 family — is one of the greatest driver's cars Ferrari has produced in the modern era, distilling decades of Formula 1 and GT racing knowledge into a road-legal supercar of breathtaking capability and character. The 488 Pista name, meaning track in Italian, signals immediately that this is not a comfortable grand tourer but a focused, purposeful machine designed around driver engagement above all other considerations. Its 3.9-liter twin-turbocharged V8 produces 720 horsepower — the most powerful eight-cylinder engine Ferrari had ever built at its launch — and delivers its power with a ferocity and immediacy that leaves both driver and passenger breathless. The peak torque of 568 lb-ft arrives at 3,000 RPM and remains almost entirely flat through to the 8,000 RPM redline, creating an unrelenting surge of acceleration that propels the car from zero to 60 mph in just 2.85 seconds. Named to honor its racing heritage — the 488 Challenge and GT3 race cars share much with the Pista — the road car benefits directly from motorsport development. The aerodynamic package generates 20% more downforce than the standard 488 GTB using active aero elements including a unique S-Duct nose design that channels airflow from the underbody through the front hood for maximum front-end downforce. The carbon fiber bodywork is extensively employed — the bumpers, hood, doors, and rear diffuser are all carbon fiber, reducing weight dramatically. Ferrari's Side Slip Control 6.0 system with Ferrari Dynamic Enhancer allows even experienced drivers to access the car's limit with confidence while enabling the truly skilled to explore the full dynamic envelope with rewarding precision. Inside, the weight-saving philosophy continues: polycarbonate rear window, stripped headliner, and a focus on essential controls. The Ferrari 488 Pista is not merely a fast car — it is a supercar philosopher's statement about what the medium can achieve.",
    "country": "Italy",
    "tags": ["supercar", "Ferrari", "twin-turbo V8", "track focused", "exotic", "mid-engine", "rear-wheel drive", "Italian"],
    "price": 250000,
    "localID": 19,
    "threeDfile": "ferrari_488_pista_widebody.glb"
  },
  {
    "name": "Jeep Wrangler",
    "type": "Off-road",
    "manufacturer": "Jeep",
    "year": 2024,
    "images": [
      "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SmVlcCUyMFdyYW5nbGVyfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1640021042546-2a1b900f324b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SmVlcCUyMFdyYW5nbGVyfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1595392004747-3d9b64a4b013?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SmVlcCUyMFdyYW5nbGVyfGVufDB8fDB8fHww"
    ],
    "description": "The 2024 Jeep Wrangler is perhaps the most authentic and uncompromising off-road vehicle available to civilian buyers — a direct descendant of the WWII military Jeep that has retained its core DNA of removable doors, fold-down windshield, and body-on-frame construction while modernizing its powertrain, technology, and safety features for contemporary drivers. Few vehicles in history have inspired the passionate, almost cultish loyalty that the Wrangler commands. Its boxy, instantly recognizable silhouette has remained largely unchanged in proportion across generations because Jeep understands that the shape is not merely styling — it is functional geometry optimized for extreme terrain clearance, approach and departure angles, and water fording up to 30 inches. Off-road capability is unmatched in production vehicles at this price: the Rubicon variant, the most capable configuration, features front and rear Dana 44 heavy-duty axles, electronically disconnecting front sway bar, front and rear locking differentials, 33-inch off-road tires, and rock-rail side protection as standard equipment — enabling it to tackle terrain that would strand virtually any other stock production SUV. Powertrain options include a 2.0-liter turbocharged four-cylinder producing 270 horsepower, a 3.6-liter naturally aspirated V6 producing 285 horsepower, and a 6.4-liter Hemi V8 producing 392 horsepower in the Rubicon 392 variant — the fastest Wrangler ever built. The 4xe plug-in hybrid combines a 2.0-liter turbocharged engine with two electric motors for a combined 375 horsepower and approximately 21 miles of all-electric driving range, offering both environmental credentials and instant electric torque that actually enhances off-road crawling ability. Open-air freedom defines the Wrangler experience: the standard soft top or optional hard top can be completely removed, as can all four doors, transforming the cabin into a completely open framework. The Uconnect 5 infotainment system with a 12.3-inch touchscreen brings modern connectivity without compromising the Wrangler's fundamental adventurous character. It is simultaneously an off-road legend and a uniquely personal expression of freedom.",
    "country": "USA",
    "tags": ["off-road", "4x4", "Jeep", "removable doors", "rugged", "trail rated", "open air", "adventure"],
    "price": 35000,
    "localID": 20,
    "threeDfile": "2023_jeep_wrangler_rubicon_392_20th_anniversary.glb"
  },
  {
    "name": "Range Rover Sport",
    "type": "SUV",
    "manufacturer": "Land Rover",
    "year": 2024,
    "images": [
      "https://images.unsplash.com/photo-1638686302275-0e87df720aca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UmFuZ2UlMjBSb3ZlciUyMFNwb3J0fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1549632891-a0bea6d0355b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmFuZ2UlMjBSb3ZlciUyMFNwb3J0fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1679506640590-f0152786dff0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UmFuZ2UlMjBSb3ZlciUyMFNwb3J0fGVufDB8fDB8fHww"
    ],
    "description": "The 2024 Range Rover Sport represents the zenith of the British luxury SUV tradition — a vehicle that synthesizes genuine off-road capability, dynamic on-road performance, and an interior environment that competes with the finest luxury saloons in the world. The third-generation Sport, built on Land Rover's modular longitudinal architecture (MLA-Flex) shared with the full-size Range Rover, achieves a significant leap in structural rigidity, refinement, and technology over its predecessor. Its exterior communicates quiet confidence: clean surfaces, a sculpted bonnet, slender LED Matrix headlights, and a fastback-influenced roofline give it a purposeful, athletic stance that distinguishes it from any competitor. Powertrain range for 2024 is exceptionally broad: the P400 pairs a mild-hybrid 3.0-liter inline six-cylinder producing 400 horsepower with a 48-volt electric motor for seamless launch assist. The P510e plug-in hybrid combines the same six-cylinder with an electric motor for a combined 510 horsepower and a 100+ km electric-only range, significantly reducing urban fuel consumption. At the performance apex, the P530 twin-turbocharged 4.4-liter V8 — developed with BMW — outputs 530 horsepower and propels the Sport from standstill to 100 km/h in 4.3 seconds, yet delivers this performance with the cultured restraint synonymous with the Range Rover name. The off-road credentials are extraordinary: Terrain Response 2 with auto mode continuously monitors driving conditions and optimizes settings for mud, sand, rocks, grass, and deep snow. Wade sensing technology monitors water depth during river crossings, and the air suspension raises ground clearance to 295 mm when required. Inside, the Pivi Pro infotainment system occupies a curved 13.1-inch Pixel-Dense touchscreen with an intuitive interface, complemented by a 13.7-inch instrument display. Configurable ambient lighting, a meridian surround sound system, and four-zone climate control create a first-class cabin environment. The rear seats can be specified as individual executive chairs with massage, heating, cooling, and a deployable ottoman footrest. The Range Rover Sport is unique — athletic yet opulent, capable anywhere, and magnificent everywhere.",
    "country": "UK",
    "tags": ["luxury SUV", "Land Rover", "off-road", "all-wheel drive", "turbocharged", "plug-in hybrid", "British", "premium"],
    "price": 80000,
    "localID": 21,
    "threeDfile": "2023_land_rover_range_rover_sport.glb"
  },
  {
    "name": "Volvo XC90",
    "type": "SUV",
    "manufacturer": "Volvo",
    "year": 2024,
    "images": [
      "https://images.unsplash.com/photo-1629897048514-3dd7414fe72a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Vm9sdm8lMjBYQzkwfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1597220457711-ba9917ed6c59?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Vm9sdm8lMjBYQzkwfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1642241339028-e4fb53bc5f4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFZvbHZvJTIwWEM5MHxlbnwwfHwwfHx8MA%3D%3D"
    ],
    "description": "The 2024 Volvo XC90 Recharge is the definitive expression of Scandinavian luxury — a three-row plug-in hybrid SUV that combines class-leading safety technology, a serene and beautifully crafted interior, and a compelling electrified powertrain into a package that prioritizes the wellbeing of its occupants above all else. Volvo's philosophy has always centered on safety, and the XC90 continues this mission with an extraordinary array of standard and available active safety features: City Safety with Auto Brake, Run-off Road Mitigation, Oncoming Lane Mitigation, Cross Traffic Alert with auto brake, and a 360-degree camera system form a safety cocoon around the vehicle. Volvo was the first manufacturer to cap the top speed of all its cars at 180 km/h — a decision that reflects the brand's genuine commitment to safety over marketing theater. The XC90 Recharge T8 plug-in hybrid powertrain pairs a supercharged and turbocharged 2.0-liter four-cylinder engine with front and rear electric motors for a total system output of 455 horsepower — enabling both an electric-only range of approximately 40 km for zero-emission urban driving and the full combined power output for demanding highway situations. The transition between electric and combustion power is imperceptible — a hallmark of Volvo's powertrain calibration expertise. Inside, the XC90's interior is one of automotive design's finest achievements: Nappa leather, open-pore walnut or driftwood accents, a crystal gear shifter developed in collaboration with Orrefors — the Swedish glassmaker — and a Bowers & Wilkins speaker system designed to reproduce the acoustic ambience of Gothenburg's Gothenburg Concert Hall create an environment of genuine sensory richness. The central 9-inch portrait Sensus touchscreen, while dated by current standards, operates with a clean Android-based interface. Seating for seven across three rows, with ample second-row recline and folding third-row seats, makes the XC90 an excellent large family companion. IIHS Top Safety Pick+ in every tested configuration confirms what Volvo has always promised: this is one of the safest family vehicles on the road.",
    "country": "Sweden",
    "tags": ["luxury SUV", "Volvo", "plug-in hybrid", "safety", "7 seats", "Scandinavian", "family SUV", "all-wheel drive"],
    "price": 65000,
    "localID": 22,
    "threeDfile": "volvo_xc90_inscription.glb"
  },
  {
    "name": "Skoda Octavia",
    "type": "Sedan",
    "manufacturer": "Skoda",
    "year": 2023,
    "images": [
      "https://images.unsplash.com/photo-1541845597-4b8d7bf81ebf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2tvZGElMjBPY3RhdmlhfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1673822317390-d1a8c15ad656?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U2tvZGElMjBPY3RhdmlhfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1673822317394-6fd502a324e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFNrb2RhJTIwT2N0YXZpYXxlbnwwfHwwfHx8MA%3D%3D"
    ],
    "description": "The 2023 Skoda Octavia is the Czech brand's most important and most successful model — a large family sedan that has consistently offered the practicality, space, and build quality of vehicles from parent company Volkswagen at a considerably more accessible price point. The Octavia has long been celebrated for its no-nonsense approach to value: buyers receive a spacious, well-built, and technologically up-to-date car without paying for badge prestige. Built on Volkswagen's MQB platform, the fourth-generation Octavia shares its underpinnings with the Golf, Seat Leon, and Audi A3, benefiting from the same rigorous engineering development while Skoda's value-oriented approach keeps prices competitive. Engine choices are extensive: turbocharged 1.0-liter and 1.5-liter TSI petrol engines cover economical daily driving, while a 2.0-liter TSI producing 190 or 245 horsepower serves drivers who want more verve. A 2.0-liter TDI diesel is available for long-distance economy, and a plug-in hybrid iV variant combining a 1.4-liter TSI engine with an electric motor offers up to 55 km of electric-only range. The Octavia RS — Skoda's performance variant — packs 245 horsepower from the 2.0-liter TSI and optional all-wheel drive into a subtly sportier body kit and revised chassis setup that delivers genuine hot-saloon credentials. Interior space is the Octavia's most compelling practical asset: the Simply Clever philosophy results in a cabin loaded with thoughtful storage solutions — umbrella holders, ticket hooks, ice scrapers built into the fuel cap, and a class-leading 600-liter boot that competes with many full-size estate cars. The standard infotainment system features a 9.2-inch or 10-inch touchscreen with wireless Apple CarPlay and Android Auto across most trim levels. Full LED headlights with matrix capability, travel assist for semi-automated motorway driving, and a comprehensive array of active safety features complete a specification list that would have been considered premium just a few years ago. The Octavia is the pragmatic, intelligent choice — substance triumphant over showmanship.",
    "country": "Czech Republic",
    "tags": ["sedan", "Skoda", "spacious", "value for money", "European", "turbocharged", "family car", "practical"],
    "price": 22000,
    "localID": 23,
    "threeDfile": "2019_skoda_octavia_tsi_280.glb"
  },
  {
    "name": "Subaru Forester",
    "type": "SUV",
    "manufacturer": "Subaru",
    "year": 2024,
    "images": [
      "https://images.unsplash.com/photo-1722542517938-aa6a98d25235?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3ViYXJ1JTIwRm9yZXN0ZXJ8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1624644212489-12d47a2f47d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFN1YmFydSUyMEZvcmVzdGVyfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1659664293712-6c90e0b078f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFN1YmFydSUyMEZvcmVzdGVyfGVufDB8fDB8fHww"
    ],
    "description": "The 2024 Subaru Forester is a compact SUV built on a fundamentally different set of priorities from most of its competitors — focusing on all-weather capability, outstanding outward visibility, and genuine trail-ready ability rather than flashy styling or maximum technology. The result is a remarkably capable, honest, and practical vehicle that has earned a fiercely devoted following among outdoor enthusiasts, families in snowy climates, and buyers who want a compact SUV that can genuinely handle conditions that leave lesser vehicles stranded. Symmetrical full-time all-wheel drive is standard on every Forester — not a $2,000 option as with many competitors — and it works in concert with Subaru's X-Mode system on higher trims to optimize traction on loose, slippery, or uneven terrain with automatic hill descent control managing steep descents. Ground clearance of 8.7 inches gives the Forester genuine trail access without requiring any modifications. The standard powertrain is a 2.5-liter naturally aspirated horizontally opposed Boxer four-cylinder engine producing 182 horsepower. Subaru's Boxer engine layout — with cylinders opposing each other in a horizontal configuration — lowers the center of gravity compared to conventional inline or V arrangements and contributes to the Forester's stable, planted dynamic character. The continuously variable transmission (CVT) is well-calibrated, prioritizing smooth power delivery over sporty response. The interior prioritizes visibility above almost everything else: a tall greenhouse, large windows, and an upright windshield create a 360-degree view of the world outside that is genuinely exceptional — making the Forester one of the easiest compact SUVs to maneuver and park. Standard EyeSight driver assistance technology — Subaru's camera-based system covering adaptive cruise control, pre-collision braking, and lane centering — achieves consistently excellent performance ratings from independent safety organizations. Cargo space of 28.9 cubic feet behind the rear seat and 74.2 cubic feet with seats folded, combined with a low load floor, makes it a practical hauler for outdoor gear, strollers, and family luggage. The Forester may not excite at first glance, but it is a vehicle of genuine substance.",
    "country": "Japan",
    "tags": ["compact SUV", "Subaru", "all-wheel drive", "all-weather", "off-road", "family SUV", "practical", "safety"],
    "price": 30000,
    "localID": 24,
    "threeDfile": "2020_subaru_forester.glb"
  },
  {
    "name": "Mitsubishi Lancer Evolution",
    "type": "Sedan",
    "manufacturer": "Mitsubishi",
    "year": 2023,
    "images": [
      "https://images.unsplash.com/photo-1611396058741-1d570a4fcf95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWl0c3ViaXNoaSUyMExhbmNlcnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1694103216506-7a4b30e4c185?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE1pdHN1YmlzaGklMjBMYW5jZXJ8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1611330790637-6950f2a02b12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE1pdHN1YmlzaGklMjBMYW5jZXJ8ZW58MHx8MHx8fDA%3D"
    ],
    "description": "The Mitsubishi Lancer Evolution is one of the most celebrated and beloved performance sedans in automotive history — a car that turned the humble family sedan formula into a World Rally Championship weapon and proved that four-door practicality and supercar-rivaling performance are not mutually exclusive. Originally developed by Mitsubishi to homologate a rally car for international competition in the early 1990s, the Evolution went through ten generations before production ended in 2016, each one refining the core formula of a turbocharged 2.0-liter engine driving all four wheels through Mitsubishi's advanced Super All-Wheel Control (S-AWC) system. The final Lancer Evolution X, which remains a sought-after enthusiast vehicle, features a 2.0-liter turbocharged MIVEC four-cylinder engine producing 291 horsepower — modest by supercar standards but delivering it with a directness and urgency that shames more powerful competitors. The S-AWC system integrates active center differential, active yaw control, and active stability control into a cohesive platform that enables cornering speeds that defy physics and a steering response that communicates road surface texture with telemetric precision. The chassis is famously stiff and communicative — on a challenging mountain road, the Lancer Evolution feels like a fighter jet with license plates, responding to driver inputs with an immediacy that creates a profound sense of mechanical partnership. Standard Brembo brakes — a first for the segment at the time of its release — provide stopping power far beyond what the car's modest appearance suggests. The interior is functional rather than luxurious, with Recaro seats, a carbon fiber roof panel in RS variants to lower the center of gravity, and purposeful controls that eliminate distraction. Limited-slip differentials front and rear, a close-ratio six-speed dual-clutch transmission in premium variants, and available Sport ABS complete the performance specification. The Lancer Evolution remains a cult legend — a car that made the impossible look effortless.",
    "country": "Japan",
    "tags": ["performance sedan", "Mitsubishi", "turbocharged", "all-wheel drive", "rally heritage", "sports car", "iconic", "driver's car"],
    "price": 20000,
    "localID": 25,
    "threeDfile": "mitsubishi_lancer_evolution_6___www.vecarz.com.glb"
  },
  {
    "name": "Dodge Charger",
    "type": "Muscle",
    "manufacturer": "Dodge",
    "year": 2023,
    "images": [
      "https://images.unsplash.com/photo-1669160916080-3981352fbe31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fERvZGdlJTIwQ2hhcmdlcnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1618458715022-a18d229aca79?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fERvZGdlJTIwQ2hhcmdlcnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1620757993963-2f362f6f410a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fERvZGdlJTIwQ2hhcmdlcnxlbnwwfHwwfHx8MA%3D%3D"
    ],
    "description": "The Dodge Charger SRT Hellcat is the apex predator of the American muscle car world — a four-door family sedan that simultaneously serves as the most powerful production muscle car ever built, combining everyday practicality with supercar-shaming straight-line performance that has made it a legend on drag strips across North America. The 2023 Charger represents the final chapter of the long-running LX-generation platform, and Dodge has ensured this swan song is appropriately spectacular: the supercharged 6.2-liter Hemi V8 in Hellcat specification generates 717 horsepower and 656 lb-ft of torque, while the Jailbreak variant pushed the output to a stratospheric 807 horsepower in final-year Swinger special edition trim. The Redeye Widebody configuration produces 797 horsepower as standard, with widened composite front fenders accommodating massive 305-section rear tires for maximum mechanical grip. The acceleration figures are as intimidating as the numbers suggest: zero to 60 mph in 3.6 seconds and a quarter-mile time of 10.96 seconds make the Charger Hellcat genuinely competitive with dedicated sports cars at a fraction of their price. Yet the Charger's defining characteristic is its insistence on four-door practicality — this extraordinary performance is accessible to five occupants, with a genuinely useful rear seat and a surprisingly practical 16.5 cubic-foot trunk. The interior blends muscle car attitude with Uconnect 5 sophistication: an available 10.1-inch touchscreen, wireless Apple CarPlay, and a performance pages display showing real-time horsepower, torque, 0–60 times, and lateral g-forces. Launch control, line-lock for rear tire burnout warm-up, and multiple driving modes including Track, Sport, Street, and Custom allow significant tailoring of the powertrain and chassis behavior. The Charger's muscular exterior — available in an iconic range of colors including Go Mango, Hellraisin, and Sinamon Stick — completes a vehicle that is equal parts outrageous, practical, and unmistakably American.",
    "country": "USA",
    "tags": ["muscle car", "Dodge", "supercharged V8", "high performance", "American", "rear-wheel drive", "Hellcat", "drag racing"],
    "price": 42000,
    "localID": 26,
    "threeDfile": "2015_dodge_charger_srt_hellcat.glb"
  },
  {
    "name": "Cadillac Escalade",
    "type": "SUV",
    "manufacturer": "Cadillac",
    "year": 2024,
    "images": [
      "https://images.unsplash.com/photo-1683778547049-8d969766b441?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2FkaWxsYWMlMjBFc2NhbGFkZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1684208551873-64416367be50?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2FkaWxsYWMlMjBFc2NhbGFkZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1684208552043-78e8d992eff2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENhZGlsbGFjJTIwRXNjYWxhZGV8ZW58MHx8MHx8fDA%3D"
    ],
    "description": "The 2024 Cadillac Escalade is the undisputed monarch of the American full-size luxury SUV segment — a vehicle that has defined status and opulence for over two decades and continues to set the standard for what a large premium SUV can offer in terms of interior drama, technology sophistication, and sheer road presence. Its imposing dimensions — over 5.3 meters in standard wheelbase and over 5.7 meters in ESV extended form — command attention and confer authority whether parked outside a luxury hotel or navigating a city street. The fifth-generation Escalade's most dramatic achievement is its interior: a 38-inch curved OLED display sweeps across the dashboard, incorporating a 7.2-inch driver display, a 14.2-inch infotainment touchscreen, and a 16.9-inch passenger display into a single spectacular visual arc. The AKG Studio Reference Audio system — a 36-speaker, 28-channel system — delivers concert hall acoustics within the cabin. The seats, available in leather or semi-aniline leather with genuine open-pore wood, polished metal, and piano black accents, create an environment that rivals the finest European luxury saloons. Magnetically adjustable air suspension with 22 sensors continuously reads road conditions, enabling a ride quality that belies the Escalade's considerable mass. The 6.2-liter naturally aspirated V8 produces 420 horsepower with GM's cylinder deactivation system for improved highway fuel economy, while a 3.0-liter inline six-cylinder diesel generates 277 horsepower and 460 lb-ft of torque — offering impressive fuel efficiency for such a large vehicle. Super Cruise, Cadillac's hands-free highway driving assistance system, works on over 400,000 mapped miles of North American highways and represents the most advanced production driver assistance system available in an American vehicle. Seven-seat capacity with a configurable third row, 25.5 cubic feet of cargo space behind the third row expanding to 121 cubic feet with all seats folded, and available Magnetic Ride Control complete a specification that is genuinely extraordinary. The Escalade is not just a vehicle — it is a statement of arrival.",
    "country": "USA",
    "tags": ["full-size SUV", "Cadillac", "luxury", "OLED display", "7 seats", "American luxury", "V8", "Super Cruise"],
    "price": 85000,
    "localID": 27,
    "threeDfile": "2015_cadillac_escalade_esv.glb"
  },
  {
    "name": "Chery Tiggo 7",
    "type": "SUV",
    "manufacturer": "Chery",
    "year": 2024,
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnJh_rTJTfo6j1itLKN9a1hvwn6EfDUiz2Mg&s",
      "https://image.made-in-china.com/202f0j00UdaoSpWlnykL/Chery-Tiggo-7-PRO-Plus-1-6t-Cheapest-Petrol-Vehicle-Gasoline-Car-Chery-Tiggo-7-Plus-SUV-Car-in-China.webp",
      "https://image.made-in-china.com/365f3j00FIbvpgslCWqa/2023-2024-China-Chery-Tiggo-7-7-Plus-Cheaper-New1-5-Pure-Gasoline-Car.webp"
    ],
    "description": "The 2024 Chery Tiggo 7 Pro is a compelling representative of China's rapidly maturing automotive industry — a compact SUV that delivers a feature set and visual presence that would have been unimaginable from a Chinese mainstream brand just a decade ago, yet remains priced at a level that makes premium specifications accessible to a far wider audience. Chery, one of China's largest independent automakers with a growing international presence spanning markets across South America, the Middle East, and Southeast Asia, has invested heavily in the Tiggo 7 as its global compact SUV ambassador. The exterior adopts a striking contemporary design with a bold front grille, slim LED headlight assemblies, and a sculpted body that draws favorable comparisons to European compact SUVs considerably more expensive. The Tiggo 7 Pro's interior is one of its strongest selling points: a panoramic dual-screen cockpit presents a 12.3-inch digital instrument cluster and a 10.25-inch central infotainment touchscreen in a flowing landscape arrangement, delivering a visual sophistication that exceeds expectations. The infotainment system supports voice control, online navigation, wireless Apple CarPlay, and a suite of connected car functions. Powertrain options center on a 1.6-liter turbocharged four-cylinder engine producing either 145 or 197 horsepower depending on state of tune, mated to either a seven-speed dual-clutch automatic transmission or a continuously variable transmission. Front-wheel drive is standard, with all-wheel drive available on higher specification variants. Ride quality is well-tuned for urban and suburban driving — the suspension absorbs road imperfections with a composure that makes longer journeys genuinely comfortable. Standard safety equipment includes autonomous emergency braking, lane departure warning, blind-spot monitoring, and rear cross-traffic alert. A panoramic sunroof, 360-degree camera system, and electric tailgate are available on premium configurations. For budget-conscious buyers in global markets seeking maximum feature content per dollar spent, the Chery Tiggo 7 Pro presents an increasingly difficult to ignore proposition.",
    "country": "China",
    "tags": ["compact SUV", "Chery", "Chinese", "affordable", "turbocharged", "dual screen", "value", "family SUV"],
    "price": 20000,
    "localID": 28,
    "threeDfile": "2023_chery_tiggo_7_plus_290t.glb"
  },
  {
    "name": "BMW M2",
    "type": "Sports Coupe",
    "manufacturer": "BMW",
    "year": 2024,
    "images": [
      "https://images.unsplash.com/flagged/photo-1553505192-acca7d4509be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym13JTIwbTh8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym13JTIwbTh8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1661050629713-832e4f77d0b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym13JTIwbTh8ZW58MHx8MHx8fDA%3D"
    ],
    "description": "The 2024 BMW M2 is the smallest, most affordable, and arguably most thrilling model in BMW's legendary M performance lineup — a compact rear-wheel drive sports coupe that carries the DNA of the iconic M3 and M4 in a package designed specifically to maximize driving engagement and emotional reward. This second-generation G87 M2 is a significant evolution from its celebrated predecessor: where the first M2 used adapted engines and running gear from other M models, the new car receives the full S58 turbocharged 3.0-liter inline six-cylinder engine directly from the M3 Competition, producing 453 horsepower and 550 Nm of torque. This is the same engine that has received widespread critical acclaim as one of the finest performance powerplants in production today, delivering power with an urgency and linearity that makes the M2's performance accessible and deeply exploitable. The result is a zero-to-60 mph time of 4.0 seconds with the optional eight-speed M Steptronic automatic transmission — or 4.3 seconds with the standard six-speed manual, the preferred choice for enthusiasts who want maximum mechanical connection. The M2's proportions are deliberately compact — a 110.6-inch wheelbase and a relatively short 4,580 mm overall length give it a density and agility that larger BMW M cars cannot match. The suspension is extensively revised from the standard 2-Series coupe: a five-link rear axle, M-specific spring and damper rates, variable M Sport steering, and an electronically controlled M rear axle limited-slip differential combine to create a chassis that rewards skill with extraordinary feedback and adjustability. On a circuit, the M2 is playful, adjustable, and communicative — it rewards the skilled driver with precise oversteer on demand while remaining forgiving enough for track day novices with the electronic safety nets fully engaged. The interior introduces BMW's latest generation curved display and a new M-specific human-machine interface with dedicated M Drive Professional functions. Carbon fiber roof, Harman Kardon audio, and M Carbon bucket seats are available as options. The M2 is the pure sports car in BMW's M lineup — small, loud, fast, and joyfully analogue in an increasingly digital world.",
    "country": "Germany",
    "tags": ["sports coupe", "BMW M", "rear-wheel drive", "turbocharged", "track car", "performance", "manual transmission", "driver's car"],
    "price": 62000,
    "localID": 29,
    "threeDfile": "2019_bmw_m2_competition.glb"
  },
  {
    "name": "BYD Han",
    "type": "Electric",
    "manufacturer": "BYD",
    "year": 2024,
    "images": [
      "https://ar.semautomobile.com/uploads/38980/small/byd-han-electric-sedan-prestige-model-fwd2a257.jpg",
      "https://i0.wp.com/edriver.by/wp-content/uploads/byd-han-l-ev-701-flagship-sboku.png?fit=939%2C444&ssl=1",
      "https://cimg3.ibsrv.net/ibimg/hgm/1920x1080-1/100/752/byd-han-ev_100752831.jpg"
    ],
    "description": "The 2024 BYD Han is one of the most sophisticated and technologically impressive electric sedans to emerge from China's rapidly evolving EV industry — a full-size luxury electric sedan that challenges established European and American electric vehicles on nearly every metric and signals BYD's arrival as a genuine global player in the premium electric vehicle segment. Powered by BYD's proprietary Blade Battery technology — a lithium iron phosphate (LFP) cell-to-pack architecture that eliminates traditional module structures in favor of elongated blade-shaped cells arranged directly into the battery pack — the Han achieves both extraordinary safety and exceptional energy density. The Blade Battery passed BYD's own nail penetration test without catching fire, a significant engineering milestone that addresses one of the EV industry's most pressing safety concerns. The Han EV's standard rear-wheel drive configuration features a single permanent magnet synchronous motor producing 272 horsepower, delivering a refined and efficient driving experience with a CLTC-rated range of 715 km — approximately 560 km in real-world conditions. The dual-motor all-wheel drive DM-P plug-in hybrid variant combines a 2.0-liter turbocharged engine with electric motors for a combined system output exceeding 510 horsepower, enabling a zero-to-100 km/h time of 3.7 seconds while maintaining the flexibility of a hybrid powertrain for drivers with range concerns. The exterior was designed by Wolfgang Egger, the former head of design at Audi, and reflects his influence clearly: the Han's proportions are elegant and restrained, with a long hood, fastback silhouette, and sophisticated LED lighting signatures that read as contemporary European premium rather than conspicuously Chinese. Inside, the cabin is appointed with Nappa leather, wood trim, a panoramic sunroof, and a 15.6-inch rotating touchscreen that swivels between landscape and portrait orientation. DiPilot, BYD's driver assistance suite covering adaptive cruise, lane centering, automatic parking, and obstacle avoidance, is available across most configurations. BYD's proprietary e-Platform 3.0, heat pump climate system, and 800V fast-charging capability on premium variants complete a technical specification that is genuinely class-competitive. The Han demonstrates that Chinese electric vehicles have crossed a threshold — these are no longer budget alternatives but credible luxury contenders.",
    "country": "China",
    "tags": ["electric sedan", "BYD", "Blade Battery", "luxury EV", "long range", "Chinese", "plug-in hybrid", "fast charging"],
    "price": 35000,
    "localID": 30,
    "threeDfile": "2023_byd_han_dm-p.glb"
  }
]`)
// --- Utilities ---

function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

function setUser(username, role = "user") {
  const user = {
    username,
    role,
    theme: localStorage.getItem("theme") || "light",
    wishList: getWishlist(),
  };
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

function getWishlist() {
  const user = getUser();
  if (user) return user.wishList || [];
  const list = localStorage.getItem("wishlist");
  return list ? JSON.parse(list) : [];
}

function toggleWishlist(carId) {
  let list = getWishlist();
  const idStr = String(carId);
  if (list.includes(idStr)) {
    list = list.filter((id) => id !== idStr);
  } else {
    list.push(idStr);
  }

  const user = getUser();
  if (user) {
    user.wishList = list;
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.setItem("wishlist", JSON.stringify(list));
  }
  return list;
}

// --- UI Logic ---

function initSharedUI() {
  // Theme Toggle
  const theme = localStorage.getItem("theme") || "light";
  if (theme === "dark") {
    document.documentElement.classList.add("darktheme");
    document.body.classList.add("darktheme");
  }

  const themeBtn = document.querySelector(".theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("darktheme");
      document.body.classList.toggle("darktheme");
      const newTheme = isDark ? "dark" : "light";
      localStorage.setItem("theme", newTheme);

      const user = getUser();
      if (user) {
        user.theme = newTheme;
        localStorage.setItem("user", JSON.stringify(user));
      }
    });
  }

  // Header Scroll
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    });
  }

  // Mobile Menu
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const active = mobileNav.classList.toggle("active");
      document.body.classList.toggle("nav-drawer-open", active);

      // Burger animation
      const spans = menuBtn.querySelectorAll("span");
      if (active) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  }

  // Navbar Dynamic Links (User vs Guest)
  const user = getUser();
  const navActions = document.querySelector(".header-right .nav-actions");
  const mobileActionsContainer = document.querySelector(".mobile-nav");

  if (navActions) {
    if (user) {
      navActions.innerHTML = `
        <a href="profile.html" class="nav-link">Profile</a>
        ${user.role === "admin" ? '<a href="admin.html" class="nav-link">Dashboard</a>' : ""}
        <button class="nav-link nav-button" onclick="logout()">Logout</button>
      `;
    } else {
      navActions.innerHTML = `
        <a href="auth.html" class="nav-link">Login</a>
        <a href="auth.html" class="nav-link">Signup</a>
      `;
    }
  }

  if (mobileActionsContainer) {
    // Find the last links in mobile nav to replace/update
    // For simplicity, let's just re-render the bottom part or handle it if we want it perfect
  }

  // Footer Year
  const yearEl = document.querySelector("[data-footer-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", initSharedUI);
