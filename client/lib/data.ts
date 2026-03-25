// Static data for Malabon Discovery Platform
// This replaces the MongoDB database for static deployment

export interface Food {
    id: string;
    name: string;
    description: string;
    category: string;
    isSignature: boolean;
    images: string[];
    history: string;
    ingredients?: string[];
    servingSize?: string;
    price?: string;
    bestPairedWith?: string;
}

export interface Business {
    id: string;
    google_place_id: string;
    name: string;
    description: string;
    address: string;
    category: string;
    rating: number;
    images: string[];
    location: {
        type: string;
        coordinates: number[];
    };
    contact: {
        phone: string;
    };
    opening_hours: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
    isPartner?: boolean;
    menu_items: string[]; // Food IDs
}

export interface CulturalStory {
    id: string;
    title: string;
    content: string;
    type: string;
    image: string;
    tags: string[];
}

export const foods: Food[] = [
    {
        id: "food_1",
        name: "Pancit Malabon",
        description: "The crown jewel of Malabon cuisine. Thick rice noodles bathed in a vibrant yellow-orange sauce made from fresh shrimp juice (caldo) and rich crab fat (aligue). Generously topped with succulent shrimp, flaked smoked fish (tinapa), crispy chicharon, hard-boiled eggs, and fresh squid rings.",
        category: "Noodle Dish",
        isSignature: true,
        images: ["/assets/images/food/pancit-malabon.png"],
        history: "Originated in the 19th century as a fisherman's dish, created by resourceful wives who transformed their husbands' daily catch into this iconic noodle masterpiece. The recipe has been passed down through generations, with each family adding their own secret touch.",
        ingredients: ["Thick rice noodles (palabok)", "Fresh shrimp", "Crab fat (aligue)", "Smoked fish (tinapa)", "Squid", "Hard-boiled eggs", "Chicharon", "Shrimp juice", "Annatto seeds", "Garlic", "Onions"],
        servingSize: "Good for 3-4 persons",
        price: "₱250-350 per bilao",
        bestPairedWith: "Calamansi and patis (fish sauce) for that authentic Malabon kick"
    },
    {
        id: "food_2",
        name: "Sapin-Sapin",
        description: "A stunning tri-colored layered masterpiece. Each vibrant layer—purple ube, white coconut, and yellow jackfruit—is made from glutinous rice flour and coconut milk, steamed to perfection. Dolor's Kakanin has perfected this delicacy since 1930.",
        category: "Dessert",
        isSignature: true,
        images: ["/assets/images/food/dolors-sapin-sapin.jpg"],
        history: "A traditional Filipino kakanin perfected by Dolor's since 1930. The name 'sapin-sapin' means 'layers upon layers,' representing the multi-generational knowledge passed down in making this delicate treat.",
        ingredients: ["Glutinous rice flour", "Coconut milk", "Condensed milk", "Ube (purple yam)", "Jackfruit", "Sugar", "Latik (coconut curds)"],
        servingSize: "1 slice (approximately 3x3 inches)",
        price: "₱15-25 per slice",
        bestPairedWith: "Hot coffee or tsokolate (Filipino hot chocolate)"
    },
    {
        id: "food_3",
        name: "Crispy Pata",
        description: "The ultimate indulgence—a whole pork leg deep-fried to golden perfection. The skin shatters into crispy shards, revealing tender meat underneath. Jamico's elevates this with their signature sweet glaze.",
        category: "Meat Dish",
        isSignature: true,
        images: ["/assets/images/food/crispy-pata.jpg"],
        history: "Popularized by Jamico's Restaurant (Judy Ann's) in the 1970s. What started as a family recipe became a Malabon legend, with people traveling from across Metro Manila just to taste their version.",
        ingredients: ["Whole pork leg (pata)", "Garlic", "Bay leaves", "Peppercorns", "Salt", "Cooking oil", "Sweet glaze", "Pickled vegetables"],
        servingSize: "Good for 4-6 persons",
        price: "₱650-850 per order",
        bestPairedWith: "Spicy vinegar dip and ice-cold beer"
    },
    {
        id: "food_4",
        name: "Broas",
        description: "Delicate, cloud-like ladyfinger biscuits that practically dissolve on your tongue. Betsy's Cake Center creates impossibly soft broas—perfect for dunking in coffee or hot chocolate.",
        category: "Pastry",
        isSignature: false,
        images: ["/assets/images/food/broas.jpg"],
        history: "A Spanish-influenced pastry adapted by local bakers.",
        price: "₱80-120 per pack"
    },
    {
        id: "food_5",
        name: "Rellenong Bangus",
        description: "A labor of love. Fresh milkfish meticulously deboned, the meat sautéed with vegetables and stuffed back into the skin, then fried until golden. A stunning whole fish bursting with savory-sweet filling.",
        category: "Seafood",
        isSignature: false,
        images: ["/assets/images/food/rellenong-bangus.jpg"],
        history: "Malabon is a fishing town, making bangus a staple.",
        price: "₱350-500 per fish"
    },
    {
        id: "food_6",
        name: "Pichi-Pichi",
        description: "Translucent, jewel-like cassava cakes with a delightfully chewy texture. Steamed with pandan for fragrance, then rolled in either freshly grated coconut or sharp cheddar cheese.",
        category: "Dessert",
        isSignature: false,
        images: ["/assets/images/food/pichi-pichi.jpg"],
        history: "A classic Filipino merienda.",
        price: "₱60-80 per pack"
    },
    {
        id: "food_7",
        name: "Kikiam",
        description: "Golden-fried rolls of savory goodness. Ground pork mixed with vegetables and water chestnuts, wrapped in bean curd skin and deep-fried until crispy. Served with sweet-spicy sauce.",
        category: "Street Food",
        isSignature: false,
        images: ["/assets/images/food/kikiam.jpg"],
        history: "Chinese-influenced snack.",
        price: "₱50-70 per order"
    },
    {
        id: "food_8",
        name: "Halo-Halo",
        description: "The ultimate Filipino summer dessert. Layers of sweetened beans, fruits, jellies topped with shaved ice, evaporated milk, ube ice cream, and leche flan. Mix it all together for a refreshing symphony.",
        category: "Dessert",
        isSignature: false,
        images: ["/assets/images/food/halo-halo.jpg"],
        history: "A classic Filipino dessert.",
        price: "₱80-120 per glass"
    },
    {
        id: "food_9",
        name: "Puto Bumbong",
        description: "Purple glutinous rice steamed in bamboo tubes, served hot with butter, muscovado sugar, and freshly grated coconut. The combination of warm rice with melting butter is pure comfort.",
        category: "Dessert",
        isSignature: false,
        images: ["/assets/images/food/puto-bumbong.jpg"],
        history: "Traditionally associated with Christmas but available year-round.",
        price: "₱30-50 per serving"
    },
    {
        id: "food_10",
        name: "Bibingka",
        description: "Fluffy rice cakes baked in clay pots lined with banana leaves. Topped with salted duck egg and kesong puti that melts into the cake. Brushed with butter and sprinkled with sugar while still hot.",
        category: "Dessert",
        isSignature: false,
        images: ["/assets/images/food/bibingka.jpg"],
        history: "Another Christmas staple.",
        price: "₱40-60 per piece"
    },
    {
        id: "food_11",
        name: "Adobong Pusit",
        description: "Tender squid simmered in soy sauce, vinegar, and garlic. The squid releases its ink, turning the sauce jet black and adding briny, oceanic depth. Intensely flavorful.",
        category: "Seafood",
        isSignature: false,
        images: ["/assets/images/food/adobong-pusit.jpg"],
        history: "A common dish in coastal towns like Malabon.",
        price: "₱180-250 per order"
    },
    {
        id: "food_12",
        name: "Sinigang na Hipon",
        description: "The ultimate Filipino comfort soup. Sour tamarind broth with plump fresh shrimp and vegetables. The sourness is perfectly balanced, making your mouth water with each spoonful.",
        category: "Seafood",
        isSignature: false,
        images: ["/assets/images/food/sinigang-hipon.jpg"],
        history: "A comfort food favorite.",
        price: "₱250-350 per bowl"
    },
    {
        id: "food_13",
        name: "Espresso",
        description: "Rich and bold concentrated coffee.",
        category: "Beverage",
        isSignature: false,
        images: ["/assets/images/food/espresso.jpg"],
        history: "Classic coffee.",
        price: "₱60-90 per shot"
    },
    {
        id: "food_14",
        name: "Iced Latte",
        description: "Espresso with cold milk and ice.",
        category: "Beverage",
        isSignature: false,
        images: ["/assets/images/food/iced-latte.jpg"],
        history: "Popular cold coffee drink.",
        price: "₱110-150 per glass"
    },
    {
        id: "food_15",
        name: "Cappuccino",
        description: "Espresso with steamed milk and foam.",
        category: "Beverage",
        isSignature: false,
        images: ["/assets/images/food/cappuccino.jpg"],
        history: "Classic Italian coffee.",
        price: "₱100-140 per cup"
    },
    {
        id: "food_16",
        name: "Spanish Latte",
        description: "Espresso with condensed milk and textured milk. Sweet and creamy.",
        category: "Beverage",
        isSignature: true,
        images: ["/assets/images/food/spanish-latte.png"],
        history: "A local favorite twist on the latte.",
        price: "₱120-160 per glass"
    },
    {
        id: "food_17",
        name: "White Chocolate Mocha",
        description: "Espresso with white chocolate sauce and steamed milk.",
        category: "Beverage",
        isSignature: true,
        images: ["/assets/images/food/white-chocolate-mocha.png"],
        history: "Sweet and indulgent.",
        price: "₱140-180 per cup"
    },
    {
        id: "food_18",
        name: "Mango Smoothie",
        description: "Refreshing smoothie made with ripe Philippine mangoes—the sweetest in the world. Blended with ice and honey for a tropical treat.",
        category: "Beverage",
        isSignature: true,
        images: ["/assets/images/food/mango-smoothie.jpg"],
        history: "Philippines is famous for its mangoes.",
        price: "₱100-140 per glass"
    },
    {
        id: "food_19",
        name: "Sisig",
        description: "The ultimate Filipino pulutan. Finely chopped pork face and ears, grilled until crispy, sizzled with onions and chili. Often topped with a raw egg that cooks on the hot plate. Dangerously addictive.",
        category: "Meat Dish",
        isSignature: true,
        images: ["/assets/images/food/sisig.png"],
        history: "The ultimate pulutan.",
        price: "₱180-250 per sizzling plate"
    },
    {
        id: "food_20",
        name: "Puto Pao",
        description: "Malabon's unique twist on the classic puto. Fluffy steamed rice cakes filled with savory asado (sweet pork) filling. The perfect combination of sweet and savory in one bite. A beloved merienda that locals queue up for at Dolor's and other kakanin shops.",
        category: "Snack",
        isSignature: true,
        images: ["/assets/images/food/puto-pao.png"],
        history: "A Malabon innovation that combines Chinese siopao filling with Filipino puto. Created in the 1950s by local bakers who wanted to offer something unique.",
        ingredients: ["Rice flour", "Sugar", "Yeast", "Water", "Pork asado filling", "Salted egg"],
        servingSize: "2-3 pieces per serving",
        price: "₱25-35 per piece",
        bestPairedWith: "Hot tsokolate or coffee for breakfast"
    },
    {
        id: "food_21",
        name: "Burong Isda",
        description: "Fermented rice and fish - an acquired taste that's deeply rooted in Malabon's fishing heritage. Fresh fish (usually mudfish or tilapia) fermented with rice and salt, creating a pungent, umami-rich condiment. Often sautéed with tomatoes and onions to mellow the strong flavor.",
        category: "Condiment",
        isSignature: true,
        images: ["/assets/images/food/burong-isda.png"],
        history: "An ancient preservation method dating back to pre-colonial times. Malabon's version is known for using exceptionally fresh fish from local waters, resulting in a cleaner, less pungent ferment.",
        ingredients: ["Fresh mudfish or tilapia", "Cooked rice", "Salt", "Tomatoes", "Onions", "Garlic"],
        servingSize: "Small serving as condiment",
        price: "₱80-120 per jar",
        bestPairedWith: "Fried fish, grilled meats, or as a rice topping"
    },
    {
        id: "food_22",
        name: "Okoy",
        description: "Crispy shrimp and vegetable fritters that are a Malabon specialty. Made with tiny fresh shrimp (alamang), julienned sweet potato, and bean sprouts, bound together with a light batter and deep-fried until golden and crunchy. Each bite delivers a satisfying crunch followed by the sweet brininess of fresh shrimp.",
        category: "Street Food",
        isSignature: true,
        images: ["/assets/images/food/ukoy.jpg"],
        history: "A coastal delicacy that showcases Malabon's abundant shrimp harvest. Street vendors have been selling okoy for generations, often made fresh to order.",
        ingredients: ["Fresh tiny shrimp (alamang)", "Sweet potato", "Bean sprouts", "Flour", "Cornstarch", "Eggs", "Annatto"],
        servingSize: "3-4 pieces per order",
        price: "₱60-90 per order",
        bestPairedWith: "Spiced vinegar with garlic and chili"
    },
    {
        id: "food_23",
        name: "Tinapa (Smoked Fish)",
        description: "Malabon's tinapa is legendary - fresh bangus (milkfish) or galunggong (mackerel scad) smoked over coconut husks until the skin turns golden brown and the flesh becomes flaky and infused with smoky flavor. The fish markets of Malabon are famous for their tinapa, with the best ones still warm from the smoker.",
        category: "Seafood",
        isSignature: true,
        images: ["/assets/images/food/tinapa.jpg"],
        history: "Smoking fish has been a preservation method in Malabon since the Spanish era. The technique was perfected by fishermen who needed to preserve their catch before refrigeration.",
        ingredients: ["Fresh bangus or galunggong", "Rock salt", "Coconut husks for smoking"],
        servingSize: "1 whole fish (medium size)",
        price: "₱120-180 per fish",
        bestPairedWith: "Steamed rice, sliced tomatoes, and spiced vinegar for breakfast"
    },
    {
        id: "food_24",
        name: "Kare-Kare",
        description: "Rich peanut stew with oxtail, tripe, and vegetables in a thick, savory-sweet sauce. Malabon's version is known for using fresh bagoong (fermented shrimp paste) from local producers, which adds an extra layer of umami. The sauce is silky smooth, coating each piece of tender meat.",
        category: "Meat Dish",
        isSignature: false,
        images: ["/assets/images/food/kare-kare.jpg"],
        history: "While kare-kare is found throughout the Philippines, Malabon's version is distinguished by the quality of its bagoong and the generous use of fresh vegetables.",
        ingredients: ["Oxtail", "Tripe", "Peanut butter", "Ground toasted rice", "Eggplant", "String beans", "Bok choy", "Bagoong"],
        servingSize: "Good for 4-5 persons",
        price: "₱450-600 per order",
        bestPairedWith: "Bagoong balayan (fermented shrimp paste) and steamed rice"
    },
    {
        id: "food_25",
        name: "Lechon Kawali",
        description: "Crispy fried pork belly that's boiled until tender, then deep-fried to achieve impossibly crispy skin and juicy meat. Malabon's lechon kawali is known for being extra crispy due to a secret technique of air-drying the boiled pork before frying. Served with liver sauce or toyomansi (soy sauce with calamansi).",
        category: "Meat Dish",
        isSignature: false,
        images: ["/assets/images/food/lechon-kawali.jpg"],
        history: "A Filipino adaptation of Spanish lechon, made more accessible by using pork belly instead of a whole pig. Malabon cooks are known for achieving the crispiest skin.",
        ingredients: ["Pork belly", "Bay leaves", "Peppercorns", "Salt", "Garlic", "Cooking oil", "Liver sauce"],
        servingSize: "Good for 3-4 persons",
        price: "₱350-500 per order",
        bestPairedWith: "Atchara (pickled papaya) and spiced vinegar"
    },
    {
        id: "food_26",
        name: "Lumpia Shanghai",
        description: "Perfectly crispy spring rolls stuffed with a savory mixture of ground pork, carrots, jicama, and garlic. Malabon's version is smaller and crunchier than most, designed for dipping into sweet chili sauce.",
        category: "Street Food",
        isSignature: false,
        images: ["/assets/images/food/lumpia.jpg"],
        history: "Influenced by Chinese spring rolls brought to the Philippines through Manila's maritime trade. Malabon families perfected the size-to-filling ratio through generations of fiesta cooking.",
        ingredients: ["Ground pork", "Carrots", "Jicama (singkamas)", "Garlic", "Onions", "Egg", "Spring roll wrapper", "Cooking oil"],
        servingSize: "10-12 pieces per order",
        price: "₱80-120 per dozen",
        bestPairedWith: "Sweet chili sauce or banana ketchup"
    },
    {
        id: "food_27",
        name: "Turon",
        description: "Golden-fried banana rolls wrapped in spring roll wrapper with a caramelized sugar coating. Saba bananas and strips of ripe jackfruit are rolled together and deep-fried, then drizzled with caramel that hardens into a crackling shell.",
        category: "Dessert",
        isSignature: false,
        images: ["/assets/images/food/turon.jpg"],
        history: "A beloved Filipino merienda snack found everywhere, but Malabon's version uses locally-sourced langka (jackfruit) for extra sweetness.",
        ingredients: ["Saba banana", "Ripe jackfruit", "Spring roll wrapper", "Brown sugar", "Cooking oil"],
        servingSize: "2-3 pieces",
        price: "₱15-25 per piece",
        bestPairedWith: "Vanilla ice cream for a decadent dessert"
    },
    {
        id: "food_28",
        name: "Biko",
        description: "Sticky, chewy glutinous rice cake cooked in coconut milk and muscovado sugar until deeply caramelized. Topped with rich latik (coconut curds) that add a nutty crunch to every bite.",
        category: "Dessert",
        isSignature: true,
        images: ["/assets/images/food/biko.jpg"],
        history: "One of the oldest Filipino kakanin, biko is a staple at Malabon's fiestas and celebrations. Dolor's and other local kakanin makers have elevated it to an art form.",
        ingredients: ["Glutinous rice (malagkit)", "Coconut milk", "Muscovado sugar", "Latik (coconut curds)"],
        servingSize: "1 slice (approximately 3x3 inches)",
        price: "₱20-30 per slice",
        bestPairedWith: "Hot Kapeng Barako (Batangas coffee)"
    },
    {
        id: "food_29",
        name: "Arroz Caldo",
        description: "Comforting Filipino rice porridge infused with ginger, garlic, and bone broth. Topped with shredded chicken, toasted garlic chips, green onions, and a squeeze of calamansi. The ultimate rainy-day comfort food.",
        category: "Soup",
        isSignature: false,
        images: ["/assets/images/food/arroz-caldo.jpg"],
        history: "A Chinese-influenced dish that became deeply Filipino. Malabon's version is known for its generous use of ginger and the addition of fish sauce for umami depth.",
        ingredients: ["Glutinous rice", "Chicken", "Ginger", "Garlic", "Fish sauce", "Green onions", "Calamansi", "Saffron/turmeric"],
        servingSize: "1 large bowl",
        price: "₱60-90 per bowl",
        bestPairedWith: "Tokwa't baboy (fried tofu and pork) on the side"
    },
    {
        id: "food_30",
        name: "Siopao Asado",
        description: "Fluffy steamed buns filled with sweet-savory barbecued pork (asado). The dough is cloud-soft and slightly sweet, encasing a filling of braised pork in a thick, caramelized sauce.",
        category: "Snack",
        isSignature: false,
        images: ["/assets/images/food/siopao.jpg"],
        history: "Brought to the Philippines by Fujian Chinese immigrants. Valeriano's Eatery in Malabon has been famous for their version since 1978.",
        ingredients: ["All-purpose flour", "Yeast", "Sugar", "Pork", "Soy sauce", "Oyster sauce", "Five-spice powder"],
        servingSize: "1 large bun",
        price: "₱35-50 per piece",
        bestPairedWith: "Hot Chinese tea or beef mami"
    },
    {
        id: "food_31",
        name: "Taho",
        description: "Silky soft tofu served warm with sweet arnibal (caramel syrup) and chewy sago pearls. A beloved Filipino street food breakfast served by ambulant vendors who walk the streets every morning calling out 'Tahooo!'",
        category: "Street Food",
        isSignature: false,
        images: ["/assets/images/food/taho.jpg"],
        history: "An adaptation of the Chinese douhua, taho became uniquely Filipino with the addition of arnibal and sago. Morning taho vendors are a fixture of Malabon's residential streets.",
        ingredients: ["Soft tofu", "Arnibal (brown sugar syrup)", "Sago pearls (tapioca)"],
        servingSize: "1 cup",
        price: "₱20-35 per cup",
        bestPairedWith: "Pandesal (Filipino bread rolls) for a classic breakfast combo"
    },
    {
        id: "food_32",
        name: "Champorado",
        description: "Rich, thick chocolate rice porridge made with tablea (artisan chocolate tablets) and glutinous rice. Served hot with a swirl of evaporated milk and often paired with dried fish (tuyo) for a sweet-salty contrast.",
        category: "Dessert",
        isSignature: false,
        images: ["/assets/images/food/champorado.jpg"],
        history: "Influenced by Mexican champurrado brought during the Manila-Acapulco galleon trade. Malabon's version uses local tablea cacao for deeper chocolate flavor.",
        ingredients: ["Glutinous rice", "Tablea (cacao tablets)", "Sugar", "Evaporated milk", "Water"],
        servingSize: "1 large bowl",
        price: "₱50-70 per bowl",
        bestPairedWith: "Fried tuyo (dried herring) — the iconic sweet-salty Filipino pairing"
    },
    {
        id: "food_33",
        name: "Binagoongan",
        description: "Pork belly braised in bagoong (fermented shrimp paste) until deeply savory and slightly sweet. The pork absorbs the intense umami of the bagoong, creating a dish that's rich, salty, and absolutely addictive with rice.",
        category: "Meat Dish",
        isSignature: true,
        images: ["/assets/images/food/binagoongan.jpg"],
        history: "Bagoong is deeply tied to Malabon's fishing heritage. Local producers ferment fresh shrimp into paste, which becomes the base for this classic dish.",
        ingredients: ["Pork belly", "Bagoong alamang", "Garlic", "Onions", "Tomatoes", "Green mango", "Chili"],
        servingSize: "Good for 2-3 persons",
        price: "₱180-250 per order",
        bestPairedWith: "Green mango slices and steamed white rice"
    },
    {
        id: "food_34",
        name: "Palabok",
        description: "Rice noodles in a savory shrimp-based orange sauce, distinct from Pancit Malabon by its thinner sauce and simpler toppings. A more accessible version of Malabon's signature dish, equally delicious in its own right.",
        category: "Noodle Dish",
        isSignature: false,
        images: ["/assets/images/food/palabok.jpg"],
        history: "Often confused with Pancit Malabon, palabok is actually a different dish using thinner noodles and a lighter sauce. Both originated from Malabon's fishing communities.",
        ingredients: ["Thin rice noodles", "Shrimp juice", "Annatto", "Pork crackling", "Smoked fish", "Hard-boiled egg", "Green onions"],
        servingSize: "Good for 2-3 persons",
        price: "₱180-280 per bilao",
        bestPairedWith: "Calamansi and patis — squeeze generously!"
    },
    {
        id: "food_35",
        name: "Ensaymada",
        description: "Buttery, sugar-topped Filipino brioche rolls that are impossibly soft and rich. The best ones are topped with a generous layer of butter, sugar, and sharp cheddar cheese that melts into the warm bread.",
        category: "Pastry",
        isSignature: false,
        images: ["/assets/images/food/ensaymada.jpg"],
        history: "Adapted from the Spanish ensaimada, Filipino ensaymada became distinctly local with the addition of cheddar cheese. Bakeries across Malabon produce their own versions.",
        ingredients: ["Bread flour", "Butter", "Eggs", "Sugar", "Cheese", "Yeast", "Milk"],
        servingSize: "1 piece",
        price: "₱30-60 per piece",
        bestPairedWith: "Hot coffee or tsokolate for merienda"
    }
];

export const businesses: Business[] = [
    {
        id: "biz_1",
        google_place_id: "manual_1",
        name: "Nanay's Pancit Malabon",
        description: "The home of the original Pancit Malabon since the 1960s. Famous for its rich, authentic flavor and generous toppings.",
        address: "37 Governor Pascual Avenue, Concepcion, Malabon City",
        category: "Restaurant",
        rating: 4.8,
        images: ["/assets/images/food/pancit-malabon.png"],
        location: { type: "Point", coordinates: [120.9560, 14.6628] },
        contact: { phone: "(02) 8281 0449" },
        opening_hours: {
            monday: "8:00 AM - 8:00 PM",
            tuesday: "8:00 AM - 8:00 PM",
            wednesday: "8:00 AM - 8:00 PM",
            thursday: "8:00 AM - 8:00 PM",
            friday: "8:00 AM - 8:00 PM",
            saturday: "8:00 AM - 9:00 PM",
            sunday: "8:00 AM - 9:00 PM"
        },
        menu_items: ["food_1", "food_7"]
    },
    {
        id: "biz_2",
        google_place_id: "manual_2",
        name: "Dolor's Kakanin",
        description: "Famous for their Sapin-Sapin and other traditional Filipino rice cakes. A Malabon institution since 1930.",
        address: "19 Governor Pascual Avenue, Concepcion, Malabon City",
        category: "Bakery",
        rating: 4.9,
        images: ["/assets/images/food/dolors-sapin-sapin.jpg"],
        location: { type: "Point", coordinates: [120.9555, 14.6622] },
        contact: { phone: "(02) 8281 2739" },
        opening_hours: {
            monday: "7:00 AM - 7:00 PM",
            tuesday: "7:00 AM - 7:00 PM",
            wednesday: "7:00 AM - 7:00 PM",
            thursday: "7:00 AM - 7:00 PM",
            friday: "7:00 AM - 7:00 PM",
            saturday: "7:00 AM - 7:00 PM",
            sunday: "7:00 AM - 5:00 PM"
        },
        menu_items: ["food_2", "food_6"]
    },
    {
        id: "biz_3",
        google_place_id: "manual_3",
        name: "Judy Ann's Crispy Pata (Jamico's)",
        description: "Home of the famous Judy Ann's Crispy Pata. A beloved family restaurant serving classic Filipino comfort food with a unique sweet glaze.",
        address: "201 General Luna Street, Concepcion, Malabon City",
        category: "Restaurant",
        rating: 4.7,
        images: ["/assets/images/food/crispy-pata.jpg"],
        location: { type: "Point", coordinates: [120.9530, 14.6610] },
        contact: { phone: "(02) 8281 4193" },
        opening_hours: {
            monday: "10:00 AM - 9:00 PM",
            tuesday: "10:00 AM - 9:00 PM",
            wednesday: "10:00 AM - 9:00 PM",
            thursday: "10:00 AM - 9:00 PM",
            friday: "10:00 AM - 10:00 PM",
            saturday: "10:00 AM - 10:00 PM",
            sunday: "10:00 AM - 9:00 PM"
        },
        menu_items: ["food_3", "food_12"]
    },
    {
        id: "biz_4",
        google_place_id: "manual_4",
        name: "Betsy's Cake Center",
        description: "Known for their soft broas and classic cakes like the 'Branzival'. A favorite stop for sweets and pastries.",
        address: "10 Rizal Avenue, Malabon City",
        category: "Bakery",
        rating: 4.6,
        images: ["/assets/images/food/broas.jpg"],
        location: { type: "Point", coordinates: [120.9545, 14.6590] },
        contact: { phone: "(02) 8281 1131" },
        opening_hours: {
            monday: "8:00 AM - 6:00 PM",
            tuesday: "8:00 AM - 6:00 PM",
            wednesday: "8:00 AM - 6:00 PM",
            thursday: "8:00 AM - 6:00 PM",
            friday: "8:00 AM - 6:00 PM",
            saturday: "8:00 AM - 6:00 PM",
            sunday: "Closed"
        },
        menu_items: ["food_4"]
    },
    {
        id: "biz_5",
        google_place_id: "manual_5",
        name: "Cocina Luna",
        description: "A modern pub and restaurant offering a fusion of traditional Malabon dishes and contemporary cuisine like Pulled Pork Sliders.",
        address: "144 General Luna Street, Malabon City",
        category: "Restaurant",
        rating: 4.5,
        images: ["/assets/images/food/rellenong-bangus.jpg"],
        location: { type: "Point", coordinates: [120.9525, 14.6605] },
        contact: { phone: "(02) 8373 1420" },
        opening_hours: {
            monday: "4:00 PM - 12:00 AM",
            tuesday: "4:00 PM - 12:00 AM",
            wednesday: "4:00 PM - 12:00 AM",
            thursday: "4:00 PM - 12:00 AM",
            friday: "4:00 PM - 2:00 AM",
            saturday: "4:00 PM - 2:00 AM",
            sunday: "4:00 PM - 12:00 AM"
        },
        menu_items: ["food_5", "food_11"]
    },
    {
        id: "biz_6",
        google_place_id: "manual_9",
        name: "Valeriano's Eatery",
        description: "A beloved family-run institution since 1978, renowned for its beef mami, siopao, and pancit.",
        address: "12 T. Santos Street, Barangay Baritan, Malabon City",
        category: "Restaurant",
        rating: 4.6,
        images: ["/assets/images/food/pancit-malabon.png"],
        location: { type: "Point", coordinates: [120.9548, 14.6575] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "6:00 AM - 6:00 PM",
            tuesday: "6:00 AM - 6:00 PM",
            wednesday: "6:00 AM - 6:00 PM",
            thursday: "6:00 AM - 6:00 PM",
            friday: "6:00 AM - 6:00 PM",
            saturday: "6:00 AM - 6:00 PM",
            sunday: "6:00 AM - 2:00 PM"
        },
        menu_items: ["food_1"]
    },
    {
        id: "biz_7",
        google_place_id: "manual_10",
        name: "Red Palmas Restaurant",
        description: "A classic dining spot in San Vicente offering hearty Filipino meals.",
        address: "Panghulo Road, San Vicente, Malabon City",
        category: "Restaurant",
        rating: 4.3,
        images: ["/assets/images/food/malabon-chicken.jpg"],
        location: { type: "Point", coordinates: [120.9580, 14.6650] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "9:00 AM - 9:00 PM",
            tuesday: "9:00 AM - 9:00 PM",
            wednesday: "9:00 AM - 9:00 PM",
            thursday: "9:00 AM - 9:00 PM",
            friday: "9:00 AM - 9:00 PM",
            saturday: "9:00 AM - 9:00 PM",
            sunday: "9:00 AM - 9:00 PM"
        },
        menu_items: ["food_12"]
    },
    {
        id: "biz_8",
        google_place_id: "manual_11",
        name: "Mila Flores Pancit Malabon",
        description: "Noted for serving a delicious version of the popular dish and quality milk teas.",
        address: "51 General Luna Street, Malabon City",
        category: "Restaurant",
        rating: 4.4,
        images: ["/assets/images/food/pancit-malabon.png"],
        location: { type: "Point", coordinates: [120.9535, 14.6615] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "8:00 AM - 8:00 PM",
            tuesday: "8:00 AM - 8:00 PM",
            wednesday: "8:00 AM - 8:00 PM",
            thursday: "8:00 AM - 8:00 PM",
            friday: "8:00 AM - 8:00 PM",
            saturday: "8:00 AM - 8:00 PM",
            sunday: "8:00 AM - 8:00 PM"
        },
        menu_items: ["food_1"]
    },
    {
        id: "biz_9",
        google_place_id: "manual_18",
        name: "Amber Golden Chain of Restaurants",
        description: "Well-regarded for its wide range of Filipino dishes, particularly its Pancit Malabon and Pichi-Pichi.",
        address: "Malabon City",
        category: "Restaurant",
        rating: 4.5,
        images: ["/assets/images/food/pancit-malabon.png"],
        location: { type: "Point", coordinates: [120.9570, 14.6640] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "9:00 AM - 9:00 PM",
            tuesday: "9:00 AM - 9:00 PM",
            wednesday: "9:00 AM - 9:00 PM",
            thursday: "9:00 AM - 9:00 PM",
            friday: "9:00 AM - 9:00 PM",
            saturday: "9:00 AM - 9:00 PM",
            sunday: "9:00 AM - 9:00 PM"
        },
        menu_items: ["food_1", "food_6"]
    },
    {
        id: "biz_10",
        google_place_id: "manual_19",
        name: "Conti's Bakeshop & Restaurant",
        description: "A popular casual dining spot known for delightful cakes, pastries, and heartwarming dishes.",
        address: "Malabon City",
        category: "Restaurant",
        rating: 4.7,
        images: ["/assets/images/food/broas.jpg"],
        location: { type: "Point", coordinates: [120.9510, 14.6580] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "8:00 AM - 9:00 PM",
            tuesday: "8:00 AM - 9:00 PM",
            wednesday: "8:00 AM - 9:00 PM",
            thursday: "8:00 AM - 9:00 PM",
            friday: "8:00 AM - 9:00 PM",
            saturday: "8:00 AM - 9:00 PM",
            sunday: "8:00 AM - 9:00 PM"
        },
        menu_items: ["food_4"]
    },
    {
        id: "biz_11",
        google_place_id: "manual_20",
        name: "Gerry's Restaurant and Bar",
        description: "Offers a pleasurable dining experience with Filipino favorites such as Sisig, Inihaw na Pusit, and Crispy Pata.",
        address: "Malabon City",
        category: "Restaurant",
        rating: 4.6,
        images: ["/assets/images/food/crispy-pata.jpg"],
        location: { type: "Point", coordinates: [120.9505, 14.6565] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "10:00 AM - 10:00 PM",
            tuesday: "10:00 AM - 10:00 PM",
            wednesday: "10:00 AM - 10:00 PM",
            thursday: "10:00 AM - 10:00 PM",
            friday: "10:00 AM - 11:00 PM",
            saturday: "10:00 AM - 11:00 PM",
            sunday: "10:00 AM - 10:00 PM"
        },
        menu_items: ["food_3", "food_12"]
    },
    {
        id: "biz_12",
        google_place_id: "manual_6",
        name: "Stay Up Espresso Bar",
        description: "A cozy coffee shop in Malabon serving artisanal coffee and pastries. A perfect spot for students and remote workers.",
        address: "General Luna St, Malabon",
        category: "Cafe",
        rating: 4.7,
        images: ["/assets/images/food/coffee-1.jpg"],
        location: { type: "Point", coordinates: [120.9528, 14.6608] },
        contact: { phone: "0917 123 4567" },
        opening_hours: {
            monday: "10:00 AM - 10:00 PM",
            tuesday: "10:00 AM - 10:00 PM",
            wednesday: "10:00 AM - 10:00 PM",
            thursday: "10:00 AM - 10:00 PM",
            friday: "10:00 AM - 12:00 AM",
            saturday: "10:00 AM - 12:00 AM",
            sunday: "10:00 AM - 10:00 PM"
        },
        menu_items: ["food_13", "food_14", "food_15"]
    },
    {
        id: "biz_13",
        google_place_id: "manual_7",
        name: "Cups & Cones",
        description: "Delightful cafe offering a wide variety of coffee blends and sweet treats. Known for their relaxing ambiance.",
        address: "Rizal Avenue, Malabon City",
        category: "Cafe",
        rating: 4.6,
        images: ["/assets/images/food/coffee-2.jpg"],
        location: { type: "Point", coordinates: [120.9542, 14.6595] },
        contact: { phone: "0918 765 4321" },
        opening_hours: {
            monday: "9:00 AM - 9:00 PM",
            tuesday: "9:00 AM - 9:00 PM",
            wednesday: "9:00 AM - 9:00 PM",
            thursday: "9:00 AM - 9:00 PM",
            friday: "9:00 AM - 10:00 PM",
            saturday: "9:00 AM - 10:00 PM",
            sunday: "9:00 AM - 9:00 PM"
        },
        menu_items: ["food_13", "food_14"]
    },
    {
        id: "biz_14",
        google_place_id: "manual_8",
        name: "Beans & Berries",
        description: "Specialty coffee and fruit blends. A popular hangout spot for locals looking for refreshing drinks.",
        address: "Governor Pascual Ave, Malabon City",
        category: "Cafe",
        rating: 4.5,
        images: ["/assets/images/food/coffee-3.jpg"],
        location: { type: "Point", coordinates: [120.9558, 14.6632] },
        contact: { phone: "0919 876 5432" },
        opening_hours: {
            monday: "8:00 AM - 8:00 PM",
            tuesday: "8:00 AM - 8:00 PM",
            wednesday: "8:00 AM - 8:00 PM",
            thursday: "8:00 AM - 8:00 PM",
            friday: "8:00 AM - 9:00 PM",
            saturday: "8:00 AM - 9:00 PM",
            sunday: "8:00 AM - 8:00 PM"
        },
        menu_items: ["food_13", "food_15"]
    },
    {
        id: "biz_15",
        google_place_id: "manual_12",
        name: "G Cafe",
        description: "A newly opened, cozy, and chill coffee spot known for its freshly brewed coffee.",
        address: "In front of Robinsons Malabon",
        category: "Cafe",
        rating: 4.5,
        images: ["/assets/images/food/coffee-1.jpg"],
        location: { type: "Point", coordinates: [120.9515, 14.6570] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "9:30 AM - 1:00 AM",
            tuesday: "9:30 AM - 1:00 AM",
            wednesday: "9:30 AM - 1:00 AM",
            thursday: "9:30 AM - 1:00 AM",
            friday: "9:30 AM - 1:00 AM",
            saturday: "9:30 AM - 1:00 AM",
            sunday: "9:30 AM - 1:00 AM"
        },
        menu_items: ["food_13", "food_14"]
    },
    {
        id: "biz_16",
        google_place_id: "manual_13",
        name: "Blend43 Cafe",
        description: "An industrial-style coffee shop offering good coffee and snacks. Open late.",
        address: "Malabon City",
        category: "Cafe",
        rating: 4.4,
        images: ["/assets/images/food/coffee-2.jpg"],
        location: { type: "Point", coordinates: [120.9575, 14.6655] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "3:00 PM - 2:00 AM",
            tuesday: "3:00 PM - 2:00 AM",
            wednesday: "3:00 PM - 2:00 AM",
            thursday: "3:00 PM - 2:00 AM",
            friday: "3:00 PM - 2:00 AM",
            saturday: "3:00 PM - 2:00 AM",
            sunday: "3:00 PM - 2:00 AM"
        },
        menu_items: ["food_13"]
    },
    {
        id: "biz_17",
        google_place_id: "manual_14",
        name: "Marchello",
        description: "A neighborhood cafe offering fresh ground coffee drinks, juices, and pastries.",
        address: "129 Gen. Luna St., Malabon",
        category: "Cafe",
        rating: 4.6,
        images: ["/assets/images/food/coffee-3.jpg"],
        location: { type: "Point", coordinates: [120.9532, 14.6600] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "12:00 PM - 11:00 PM",
            tuesday: "12:00 PM - 11:00 PM",
            wednesday: "12:00 PM - 11:00 PM",
            thursday: "12:00 PM - 11:00 PM",
            friday: "12:00 PM - 11:00 PM",
            saturday: "12:00 PM - 11:00 PM",
            sunday: "12:00 PM - 11:00 PM"
        },
        menu_items: ["food_15"]
    },
    {
        id: "biz_18",
        google_place_id: "manual_15",
        name: "Pedal Cafe - Malabon",
        description: "A cyclist-friendly spot where you can enjoy a good cup of your favorite drink.",
        address: "SkyPlaza Victoneta, Victoneta Avenue",
        category: "Cafe",
        rating: 4.7,
        images: ["/assets/images/food/coffee-1.jpg"],
        location: { type: "Point", coordinates: [120.9590, 14.6660] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "10:00 AM - 7:30 PM",
            tuesday: "10:00 AM - 7:30 PM",
            wednesday: "10:00 AM - 7:30 PM",
            thursday: "10:00 AM - 7:30 PM",
            friday: "10:00 AM - 7:30 PM",
            saturday: "10:00 AM - 7:30 PM",
            sunday: "10:00 AM - 7:30 PM"
        },
        menu_items: ["food_14"]
    },
    {
        id: "biz_19",
        google_place_id: "manual_16",
        name: "Half&Half",
        description: "An aesthetic cafe in Malabon featuring both indoor and outdoor seating.",
        address: "Malabon City",
        category: "Cafe",
        rating: 4.5,
        images: ["/assets/images/food/coffee-2.jpg"],
        location: { type: "Point", coordinates: [120.9520, 14.6585] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "Closed",
            tuesday: "3:00 PM - 11:00 PM",
            wednesday: "3:00 PM - 11:00 PM",
            thursday: "3:00 PM - 11:00 PM",
            friday: "3:00 PM - 11:00 PM",
            saturday: "3:00 PM - 11:00 PM",
            sunday: "3:00 PM - 11:00 PM"
        },
        menu_items: ["food_13"]
    },
    {
        id: "biz_20",
        google_place_id: "manual_17",
        name: "Lotus Prime Cafe",
        description: "A hangout spot for both day and night in Maysilo, Malabon.",
        address: "Maysilo, Malabon",
        category: "Cafe",
        rating: 4.3,
        images: ["/assets/images/food/coffee-3.jpg"],
        location: { type: "Point", coordinates: [120.9500, 14.6555] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "8:00 AM - 12:00 AM",
            tuesday: "8:00 AM - 12:00 AM",
            wednesday: "8:00 AM - 12:00 AM",
            thursday: "8:00 AM - 12:00 AM",
            friday: "8:00 AM - 12:00 AM",
            saturday: "8:00 AM - 12:00 AM",
            sunday: "8:00 AM - 12:00 AM"
        },
        menu_items: ["food_15"]
    },
    {
        id: "biz_21",
        google_place_id: "manual_21",
        name: "Artemis Coffee",
        description: "A popular spot in General Luna offering a wide range of frappes and crafted coffee beverages.",
        address: "General Luna St, Malabon City",
        category: "Cafe",
        rating: 4.6,
        images: ["/assets/images/businesses/artemis.jpg"],
        location: { type: "Point", coordinates: [120.9538, 14.6618] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "10:00 AM - 10:30 PM",
            tuesday: "10:00 AM - 10:30 PM",
            wednesday: "10:00 AM - 10:30 PM",
            thursday: "9:00 AM - 10:30 PM",
            friday: "10:00 AM - 11:30 PM",
            saturday: "10:00 AM - 11:30 PM",
            sunday: "10:00 AM - 11:30 PM"
        },
        menu_items: ["food_17", "food_15"]
    },
    {
        id: "biz_22",
        google_place_id: "manual_22",
        name: "Orijins Coffee House",
        description: "Specialty coffee house serving high-quality espresso-based drinks like Cortado and Ristretto.",
        address: "418 General Luna St, Bayan Bayanan, Baritan, Malabon City",
        category: "Cafe",
        rating: 4.8,
        images: ["/assets/images/businesses/orijins.jpg"],
        location: { type: "Point", coordinates: [120.9565, 14.6645] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "10:00 AM - 10:00 PM",
            tuesday: "10:00 AM - 10:00 PM",
            wednesday: "10:00 AM - 10:00 PM",
            thursday: "10:00 AM - 10:00 PM",
            friday: "10:00 AM - 10:00 PM",
            saturday: "10:00 AM - 10:00 PM",
            sunday: "10:00 AM - 10:00 PM"
        },
        menu_items: ["food_13", "food_15"]
    },
    {
        id: "biz_23",
        google_place_id: "manual_23",
        name: "But First, Coffee (BFC)",
        description: "Known for their Spanish Latte and Vietnamese Style coffee. A great place for both hot and iced coffee lovers.",
        address: "33 Governor Pascual Avenue, Malabon City",
        category: "Cafe",
        rating: 4.7,
        images: ["/assets/images/businesses/bfc.jpg"],
        location: { type: "Point", coordinates: [120.9562, 14.6625] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "8:00 AM - 10:00 PM",
            tuesday: "8:00 AM - 10:00 PM",
            wednesday: "8:00 AM - 10:00 PM",
            thursday: "8:00 AM - 10:00 PM",
            friday: "8:00 AM - 10:00 PM",
            saturday: "8:00 AM - 10:00 PM",
            sunday: "8:00 AM - 10:00 PM"
        },
        menu_items: ["food_16", "food_14"]
    },
    {
        id: "biz_24",
        google_place_id: "manual_24",
        name: "Tastes from the Greens",
        description: "Offers a refreshing variety of milk teas, fruit smoothies, and coffee. Famous for their Mango Series.",
        address: "59 General Luna St, Malabon City",
        category: "Cafe",
        rating: 4.5,
        images: ["/assets/images/businesses/tastes.jpg"],
        location: { type: "Point", coordinates: [120.9540, 14.6612] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "11:00 AM - 10:00 PM",
            tuesday: "11:00 AM - 10:00 PM",
            wednesday: "11:00 AM - 10:00 PM",
            thursday: "11:00 AM - 10:00 PM",
            friday: "11:00 AM - 10:00 PM",
            saturday: "11:00 AM - 10:00 PM",
            sunday: "11:00 AM - 10:00 PM"
        },
        menu_items: ["food_18"]
    },
    {
        id: "biz_25",
        google_place_id: "manual_25",
        name: "Antahan Café",
        description: "A cozy spot for pastries, pasta, and Filipino favorites like Sisig. Perfect for hanging out.",
        address: "28 Pureza St, Malabon City",
        category: "Cafe",
        rating: 4.4,
        images: ["/assets/images/businesses/antahan.jpg"],
        location: { type: "Point", coordinates: [120.9518, 14.6572] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "3:00 PM - 10:00 PM",
            tuesday: "3:00 PM - 10:00 PM",
            wednesday: "3:00 PM - 10:00 PM",
            thursday: "3:00 PM - 10:00 PM",
            friday: "2:00 PM - 11:00 PM",
            saturday: "2:00 PM - 11:00 PM",
            sunday: "3:00 PM - 10:00 PM"
        },
        menu_items: ["food_19", "food_15"]
    },
    {
        id: "biz_26",
        google_place_id: "manual_26",
        name: "Cafe Cera",
        description: "A relaxing cafe on Victoneta Avenue, great for studying or casual meetups.",
        address: "77 Victoneta Ave, Malabon City",
        category: "Cafe",
        rating: 4.5,
        images: ["/assets/images/businesses/cera.jpg"],
        location: { type: "Point", coordinates: [120.9588, 14.6665] },
        contact: { phone: "N/A" },
        opening_hours: {
            monday: "10:30 AM - 9:00 PM",
            tuesday: "10:30 AM - 9:00 PM",
            wednesday: "10:30 AM - 9:00 PM",
            thursday: "10:30 AM - 9:00 PM",
            friday: "10:30 AM - 9:00 PM",
            saturday: "10:30 AM - 9:00 PM",
            sunday: "Closed"
        },
        menu_items: ["food_14"]
    },
    {
        id: "biz_p1",
        google_place_id: "partner_1",
        name: "Atcharang Dampalit",
        description: "Specializing in the traditional Dampalit-style atchara (pickled papaya). A must-try accompaniment for fried and grilled dishes, made with a heirloom recipe.",
        address: "Barangay Dampalit, Malabon City",
        category: "Bakery",
        rating: 4.8,
        images: ["/assets/images/partners/atcharang dampalit.jpg"],
        location: { type: "Point", coordinates: [120.9450, 14.6750] },
        contact: { phone: "N/A" },
        opening_hours: { monday: "8:00 AM - 5:00 PM", tuesday: "8:00 AM - 5:00 PM", wednesday: "8:00 AM - 5:00 PM", thursday: "8:00 AM - 5:00 PM", friday: "8:00 AM - 5:00 PM", saturday: "8:00 AM - 12:00 PM", sunday: "Closed" },
        isPartner: true,
        menu_items: []
    },
    {
        id: "biz_p2",
        google_place_id: "partner_2",
        name: "Balsalo",
        description: "A scenic food restaurant located near the Megadike. Offers a refreshing dining experience with a view of Malabon's waterways.",
        address: "Megadike Road, Malabon City",
        category: "Restaurant",
        rating: 4.6,
        images: ["/assets/images/partners/balsalo.jpg"],
        location: { type: "Point", coordinates: [120.9500, 14.6700] },
        contact: { phone: "N/A" },
        opening_hours: { monday: "10:00 AM - 9:00 PM", tuesday: "10:00 AM - 9:00 PM", wednesday: "10:00 AM - 9:00 PM", thursday: "10:00 AM - 9:00 PM", friday: "10:00 AM - 10:00 PM", saturday: "10:00 AM - 10:00 PM", sunday: "10:00 AM - 9:00 PM" },
        isPartner: true,
        menu_items: ["food_12", "food_11"]
    },
    {
        id: "biz_p3",
        google_place_id: "partner_3",
        name: "Bangus ng Malabon",
        description: "Distinguished by the freshest locally-sourced milkfish, prepared in various traditional Malabon styles.",
        address: "Malabon Fish Port Vicinity",
        category: "Restaurant",
        rating: 4.7,
        images: ["/assets/images/partners/bangus ng malabon.jpg"],
        location: { type: "Point", coordinates: [120.9485, 14.6565] },
        contact: { phone: "N/A" },
        opening_hours: { monday: "7:00 AM - 6:00 PM", tuesday: "7:00 AM - 6:00 PM", wednesday: "7:00 AM - 6:00 PM", thursday: "7:00 AM - 6:00 PM", friday: "7:00 AM - 6:00 PM", saturday: "7:00 AM - 6:00 PM", sunday: "7:00 AM - 6:00 PM" },
        isPartner: true,
        menu_items: ["food_5", "food_23"]
    },
    {
        id: "biz_p4",
        google_place_id: "partner_4",
        name: "Camp Catch Cook",
        description: "A unique camping-style destination where visitors can catch their own fish and have it cooked on the spot. Perfect for families and nature lovers.",
        address: "Northern Malabon Rural Area",
        category: "Attraction",
        rating: 4.9,
        images: ["/assets/images/partners/camp, catch, cook.jpg"],
        location: { type: "Point", coordinates: [120.9400, 14.6780] },
        contact: { phone: "N/A" },
        opening_hours: { monday: "9:00 AM - 6:00 PM", tuesday: "9:00 AM - 6:00 PM", wednesday: "9:00 AM - 6:00 PM", thursday: "9:00 AM - 6:00 PM", friday: "9:00 AM - 8:00 PM", saturday: "8:00 AM - 9:00 PM", sunday: "8:00 AM - 8:00 PM" },
        isPartner: true,
        menu_items: []
    },
    {
        id: "biz_p5",
        google_place_id: "partner_5",
        name: "Experience My Malabon",
        description: "Professional travel and heritage tours showcasing the rich culture, history, and culinary secrets of Malabon City.",
        address: "San Bartolome, Malabon City",
        category: "Attraction",
        rating: 4.9,
        images: ["/assets/images/partners/experience my malabon.jpg"],
        location: { type: "Point", coordinates: [120.9562, 14.6630] },
        contact: { phone: "N/A" },
        opening_hours: { monday: "9:00 AM - 5:00 PM", tuesday: "9:00 AM - 5:00 PM", wednesday: "9:00 AM - 5:00 PM", thursday: "9:00 AM - 5:00 PM", friday: "9:00 AM - 5:00 PM", saturday: "8:00 AM - 6:00 PM", sunday: "8:00 AM - 6:00 PM" },
        isPartner: true,
        menu_items: []
    },
    {
        id: "biz_p6",
        google_place_id: "partner_6",
        name: "Garapon Malabon",
        description: "Specializing in preserved and bottled delicacies of Malabon, bringing the taste of the city to your home in beautifully packed jars.",
        address: "Concepcion, Malabon City",
        category: "Bakery",
        rating: 4.5,
        images: ["/assets/images/partners/garapon malabo.jpg"],
        location: { type: "Point", coordinates: [120.9540, 14.6610] },
        contact: { phone: "N/A" },
        opening_hours: { monday: "8:00 AM - 6:00 PM", tuesday: "8:00 AM - 6:00 PM", wednesday: "8:00 AM - 6:00 PM", thursday: "8:00 AM - 6:00 PM", friday: "8:00 AM - 6:00 PM", saturday: "8:00 AM - 6:00 PM", sunday: "Closed" },
        isPartner: true,
        menu_items: ["food_21"]
    },
    {
        id: "biz_p7",
        google_place_id: "partner_7",
        name: "Isda't Botelya",
        description: "A rustic dining spot offering the perfect pairing of fresh seafood dishes and artisanal beverage selections.",
        address: "Baybayin Street, Malabon City",
        category: "Restaurant",
        rating: 4.6,
        images: ["/assets/images/partners/isda't botelya.jpg"],
        location: { type: "Point", coordinates: [120.9510, 14.6600] },
        contact: { phone: "N/A" },
        opening_hours: { monday: "4:00 PM - 11:00 PM", tuesday: "4:00 PM - 11:00 PM", wednesday: "4:00 PM - 11:00 PM", thursday: "4:00 PM - 11:00 PM", friday: "4:00 PM - 1:00 AM", saturday: "4:00 PM - 1:00 AM", sunday: "4:00 PM - 11:00 PM" },
        isPartner: true,
        menu_items: ["food_11", "food_12"]
    },
    {
        id: "biz_p8",
        google_place_id: "partner_8",
        name: "JeepEats on the Wheels",
        description: "Malabon's first mobile culinary experience, bringing locally-inspired food favorites to different barangays in a stylized jeepney.",
        address: "Mobile - Check Social Media for Location",
        category: "Restaurant",
        rating: 4.7,
        images: ["/assets/images/partners/jeepeats on the wheels.jpg"],
        location: { type: "Point", coordinates: [120.9550, 14.6620] },
        contact: { phone: "N/A" },
        opening_hours: { monday: "11:00 AM - 8:00 PM", tuesday: "11:00 AM - 8:00 PM", wednesday: "11:00 AM - 8:00 PM", thursday: "11:00 AM - 8:00 PM", friday: "11:00 AM - 9:00 PM", saturday: "11:00 AM - 9:00 PM", sunday: "11:00 AM - 8:00 PM" },
        isPartner: true,
        menu_items: ["food_19", "food_22"]
    },
    {
        id: "biz_p9",
        google_place_id: "partner_9",
        name: "Kape at Iba Pets",
        description: "A pet-friendly cafe where you can enjoy quality coffee in the company of your furry friends. Features a dedicated pet play area.",
        address: "General Luna Street, Malabon",
        category: "Cafe",
        rating: 4.8,
        images: ["/assets/images/partners/kape at iba pets.jpg"],
        location: { type: "Point", coordinates: [120.9530, 14.6615] },
        contact: { phone: "N/A" },
        opening_hours: { monday: "10:00 AM - 9:00 PM", tuesday: "10:00 AM - 9:00 PM", wednesday: "10:00 AM - 9:00 PM", thursday: "10:00 AM - 9:00 PM", friday: "10:00 AM - 10:00 PM", saturday: "9:00 AM - 11:00 PM", sunday: "9:00 AM - 10:00 PM" },
        isPartner: true,
        menu_items: ["food_14", "food_15"]
    },
    {
        id: "biz_p10",
        google_place_id: "partner_10",
        name: "Malabon Getaway",
        description: "Planning your perfect stay or visit in Malabon. We offer curated experiences and accommodation recommendations.",
        address: "Maysilo, Malabon City",
        category: "Attraction",
        rating: 4.6,
        images: ["/assets/images/partners/malabon getaway.jpg"],
        location: { type: "Point", coordinates: [120.9515, 14.6550] },
        contact: { phone: "N/A" },
        opening_hours: { monday: "9:00 AM - 6:00 PM", tuesday: "9:00 AM - 6:00 PM", wednesday: "9:00 AM - 6:00 PM", thursday: "9:00 AM - 6:00 PM", friday: "9:00 AM - 6:00 PM", saturday: "9:00 AM - 4:00 PM", sunday: "Closed" },
        isPartner: true,
        menu_items: []
    },
    {
        id: "biz_p11",
        google_place_id: "partner_11",
        name: "Malabon Resilience Training Hub",
        description: "A community center dedicated to teaching traditional Malabon livelihoods and climate resilience through craft and skill-sharing.",
        address: "Brgy. Baritan, Malabon City",
        category: "Attraction",
        rating: 4.9,
        images: ["/assets/images/partners/malabon resilience training hub.jpg"],
        location: { type: "Point", coordinates: [120.9555, 14.6580] },
        contact: { phone: "N/A" },
        opening_hours: { monday: "8:00 AM - 5:00 PM", tuesday: "8:00 AM - 5:00 PM", wednesday: "8:00 AM - 5:00 PM", thursday: "8:00 AM - 5:00 PM", friday: "8:00 AM - 5:00 PM", saturday: "9:00 AM - 12:00 PM", sunday: "Closed" },
        isPartner: true,
        menu_items: []
    },
    {
        id: "biz_p12",
        google_place_id: "partner_12",
        name: "Malabon Sop (Sapin-Sapin, Okoy, Pichi-Pichi)",
        description: "The ultimate 'SOP' destination — specialized in Sapin-Sapin, Okoy, and Pichi-Pichi. A triad of Malabon's best culinary offerings in one place.",
        address: "Governor Pascual Avenue, Malabon",
        category: "Bakery",
        rating: 4.8,
        images: ["/assets/images/partners/malabon sop sapin-sapin, okoy, pitsi pitsi .jpg"],
        location: { type: "Point", coordinates: [120.9565, 14.6635] },
        contact: { phone: "N/A" },
        opening_hours: { monday: "7:00 AM - 7:00 PM", tuesday: "7:00 AM - 7:00 PM", wednesday: "7:00 AM - 7:00 PM", thursday: "7:00 AM - 7:00 PM", friday: "7:00 AM - 8:00 PM", saturday: "7:00 AM - 8:00 PM", sunday: "7:00 AM - 5:00 PM" },
        isPartner: true,
        menu_items: ["food_2", "food_6", "food_22"]
    },
    {
        id: "biz_p13",
        google_place_id: "partner_13",
        name: "Malaborn",
        description: "A trendy local lifestyle brand and concept store that celebrates the art and vibe of being 'Malaborn' — born and raised in this vibrant city.",
        address: "General Luna Street, Malabon City",
        category: "Attraction",
        rating: 4.7,
        images: ["/assets/images/partners/malaborn.jpg"],
        location: { type: "Point", coordinates: [120.9535, 14.6610] },
        contact: { phone: "N/A" },
        opening_hours: { monday: "11:00 AM - 8:00 PM", tuesday: "11:00 AM - 8:00 PM", wednesday: "11:00 AM - 8:00 PM", thursday: "11:00 AM - 8:00 PM", friday: "11:00 AM - 9:00 PM", saturday: "10:00 AM - 9:00 PM", sunday: "10:00 AM - 7:00 PM" },
        isPartner: true,
        menu_items: []
    },
    {
        id: "biz_p14",
        google_place_id: "partner_14",
        name: "Malabueno Premium Tinapa",
        description: "Export-quality smoked fish produced using traditional wood-smoking techniques. The gold standard for Malabon's legendary tinapa.",
        address: "Longos, Malabon City",
        category: "Market",
        rating: 4.9,
        images: ["/assets/images/partners/malabueno premium tinapa.jpg"],
        location: { type: "Point", coordinates: [120.9650, 14.6520] },
        contact: { phone: "N/A" },
        opening_hours: { monday: "6:00 AM - 5:00 PM", tuesday: "6:00 AM - 5:00 PM", wednesday: "6:00 AM - 5:00 PM", thursday: "6:00 AM - 5:00 PM", friday: "6:00 AM - 5:00 PM", saturday: "6:00 AM - 3:00 PM", sunday: "Closed" },
        isPartner: true,
        menu_items: ["food_23"]
    },
    {
        id: "biz_p15",
        google_place_id: "partner_15",
        name: "Megadike Floating Cafe",
        description: "A unique dining experience floating on the waters of the Megadike. Enjoy the sunset while sipping on local coffee and snacks.",
        address: "Megadike, Dampalit, Malabon City",
        category: "Cafe",
        rating: 4.7,
        images: ["/assets/images/partners/megadike floating cafe.jpg"],
        location: { type: "Point", coordinates: [120.9420, 14.6720] },
        contact: { phone: "N/A" },
        opening_hours: { monday: "2:00 PM - 9:00 PM", tuesday: "2:00 PM - 9:00 PM", wednesday: "2:00 PM - 9:00 PM", thursday: "2:00 PM - 9:00 PM", friday: "2:00 PM - 10:00 PM", saturday: "1:00 PM - 10:00 PM", sunday: "1:00 PM - 9:00 PM" },
        isPartner: true,
        menu_items: ["food_13", "food_14"]
    }
];

export const culturalStories: CulturalStory[] = [
    {
        id: "story_1",
        title: "The Legend of Pancit Malabon",
        content: "Pancit Malabon originated from the abundance of seafood in the area. Fishermen's wives would cook noodles with whatever fresh catch was available, creating the rich, seafood-heavy sauce we know today. Traditionally served in bamboo bilao trays during celebrations, this dish represents the resourcefulness and culinary creativity of Malabon's coastal communities.",
        type: "History",
        image: "/assets/images/food/pancit-malabon.png",
        tags: ["Food History", "Legend"]
    },
    {
        id: "story_2",
        title: "Malabon's Fishing Heritage",
        content: "For centuries, Malabon has been a thriving fishing community along Manila Bay. Traditional bangka boats with colorful outriggers still dot the waterways, carrying fishermen who continue the traditions of their ancestors. The city's name itself comes from 'malabon,' meaning 'plenty of fish,' reflecting its rich maritime heritage that continues to shape local culture and cuisine.",
        type: "Tradition",
        image: "/assets/images/fishing-heritage.jpg",
        tags: ["Maritime", "Tradition", "Fishing"]
    },
    {
        id: "story_3",
        title: "The Malabon River Story",
        content: "The Malabon River has been the lifeblood of the city for generations. Its waters connected communities, enabled trade, and provided sustenance through abundant fish and seafood. Though the river faces modern challenges, it remains central to Malabon's identity. The waterways that once brought prosperity continue to inspire the city's resilience and the unique flavors that define Malabon cuisine.",
        type: "History",
        image: "/assets/images/malabon-river.jpg",
        tags: ["River", "History", "Waterways"]
    }
];

// Helper function to get food by ID
export function getFoodById(id: string): Food | undefined {
    return foods.find(f => f.id === id);
}

// Helper function to get business by ID
export function getBusinessById(id: string): Business | undefined {
    return businesses.find(b => b.id === id);
}

// Helper function to get story by ID
export function getStoryById(id: string): CulturalStory | undefined {
    return culturalStories.find(s => s.id === id);
}

// Malabon Map Constants
export const MALABON_CENTER: [number, number] = [14.6628, 120.9517];
export const MALABON_BOUNDS: [[number, number], [number, number]] = [
    [14.6450, 120.9350], // SW corner
    [14.6800, 120.9700], // NE corner
];

export interface Landmark {
    id: string;
    name: string;
    description: string;
    category: string;
    coordinates: [number, number]; // [lat, lng]
    image?: string;
}

export const landmarks: Landmark[] = [
    {
        id: "lm_1",
        name: "San Bartolome Parish Church",
        description: "A historic church dating back to the Spanish colonial era. One of Malabon's most iconic heritage sites.",
        category: "Heritage",
        coordinates: [14.6630, 120.9560],
        image: "/assets/images/places/san-bartolome.jpg"
    },
    {
        id: "lm_2",
        name: "Malabon Fish Port Complex",
        description: "The largest fish market in Metro Manila. Experience the bustling trade of fresh seafood daily.",
        category: "Market",
        coordinates: [14.6560, 120.9480],
        image: "/assets/images/places/fish-port.jpg"
    },
    {
        id: "lm_3",
        name: "Raymundo House",
        description: "A preserved ancestral house showcasing the lifestyle of Malabon's wealthy families during the Spanish era.",
        category: "Heritage",
        coordinates: [14.6625, 120.9540],
        image: "/assets/images/places/raymundo-house.jpg"
    },
    {
        id: "lm_4",
        name: "Malabon City Hall",
        description: "The seat of local government and a central landmark of Malabon City.",
        category: "Government",
        coordinates: [14.6618, 120.9510],
        image: "/assets/images/places/city-hall.jpg"
    },
    {
        id: "lm_5",
        name: "Concepcion National High School",
        description: "A prominent public high school and community hub in Barangay Concepcion.",
        category: "Education",
        coordinates: [14.6640, 120.9575],
        image: "/assets/images/places/concepcion-nhs.jpg"
    },
    {
        id: "lm_6",
        name: "Robinsons Place Malabon",
        description: "A major shopping destination offering retail, dining, and entertainment for locals and visitors.",
        category: "Shopping",
        coordinates: [14.6580, 120.9520],
        image: "/assets/images/places/robinsons.jpg"
    }
];

export const categoryIcons: Record<string, string> = {
    Restaurant: "🍽️",
    Bakery: "🍞",
    Cafe: "☕",
    Heritage: "🏛️",
    Market: "🐟",
    Government: "🏢",
    Education: "🎓",
    Shopping: "🛒",
};
