import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Business from './models/Business.js';
import Food from './models/Food.js';
import CulturalStory from './models/CulturalStory.js';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in .env file');
    process.exit(1);
}

const foodsData = [
    // Original Foods
    {
        name: "Pancit Malabon",
        description: "The city's signature dish. Thick rice noodles with a yellow-orange sauce made from shrimp juice and crab fat, topped with shrimp, smoked fish flakes, chicharon, and eggs.",
        category: "Noodle Dish",
        isSignature: true,
        images: ["/assets/images/food/pancit-malabon.png"],
        history: "Originated in the 19th century as a fisherman's dish."
    },
    {
        name: "Sapin-Sapin",
        description: "A layered glutinous rice and coconut dessert. Dolor's Kakanin is the most famous maker, known for their colorful and soft version.",
        category: "Dessert",
        isSignature: true,
        images: ["/assets/images/food/dolors-sapin-sapin.jpg"],
        history: "A traditional Filipino kakanin perfected by Dolor's since 1930."
    },
    {
        name: "Crispy Pata",
        description: "Deep-fried pork knuckle with a crackling skin and tender meat. Jamico's Restaurant serves a unique version with a sweet glaze and pickles.",
        category: "Meat Dish",
        isSignature: true,
        images: ["/assets/images/food/crispy-pata.jpg"],
        history: "Popularized by Jamico's Restaurant (Judy Ann's)."
    },
    {
        name: "Broas",
        description: "Soft, ladyfinger-like biscuits. Betsy's Cake Center is famous for their soft broas which are perfect with coffee or hot chocolate.",
        category: "Pastry",
        isSignature: false,
        images: ["/assets/images/food/broas.jpg"],
        history: "A Spanish-influenced pastry adapted by local bakers."
    },
    {
        name: "Rellenong Bangus",
        description: "Stuffed milkfish. A festive dish where the fish meat is deboned, cooked with spices and other ingredients, and stuffed back into the skin.",
        category: "Seafood",
        isSignature: false,
        images: ["/assets/images/food/rellenong-bangus.jpg"],
        history: "Malabon is a fishing town, making bangus a staple."
    },
    {
        name: "Pichi-Pichi",
        description: "Steamed cassava cake coated with grated coconut or cheese. Amber's is a popular choice.",
        category: "Dessert",
        isSignature: false,
        images: ["/assets/images/food/pichi-pichi.jpg"],
        history: "A classic Filipino merienda."
    },
    {
        name: "Kikiam",
        description: "Fried pork and vegetable rolls wrapped in bean curd skin. A popular street food in Malabon.",
        category: "Street Food",
        isSignature: false,
        images: ["/assets/images/food/kikiam.jpg"],
        history: "Chinese-influenced snack."
    },
    {
        name: "Halo-Halo",
        description: "Shaved ice dessert with mixed fruits, beans, jellies, and milk. A favorite summer treat.",
        category: "Dessert",
        isSignature: false,
        images: ["/assets/images/food/halo-halo.jpg"],
        history: "A classic Filipino dessert."
    },
    {
        name: "Puto Bumbong",
        description: "Purple rice cake steamed in bamboo tubes, served with butter, sugar, and coconut.",
        category: "Dessert",
        isSignature: false,
        images: ["/assets/images/food/puto-bumbong.jpg"],
        history: "Traditionally associated with Christmas but available year-round."
    },
    {
        name: "Bibingka",
        description: "Rice cake cooked in clay pots lined with banana leaves, topped with salted egg and cheese.",
        category: "Dessert",
        isSignature: false,
        images: ["/assets/images/food/bibingka.jpg"],
        history: "Another Christmas staple."
    },
    {
        name: "Adobong Pusit",
        description: "Squid cooked in soy sauce, vinegar, and garlic. A savory seafood dish.",
        category: "Seafood",
        isSignature: false,
        images: ["/assets/images/food/adobong-pusit.jpg"],
        history: "A common dish in coastal towns like Malabon."
    },
    {
        name: "Sinigang na Hipon",
        description: "Sour tamarind soup with shrimp and vegetables.",
        category: "Seafood",
        isSignature: false,
        images: ["/assets/images/food/sinigang-hipon.jpg"],
        history: "A comfort food favorite."
    },
    // Coffee & Beverages
    {
        name: "Espresso",
        description: "Rich and bold concentrated coffee.",
        category: "Beverage",
        isSignature: false,
        images: ["/assets/images/food/coffee-1.jpg"],
        history: "Classic coffee."
    },
    {
        name: "Iced Latte",
        description: "Espresso with cold milk and ice.",
        category: "Beverage",
        isSignature: false,
        images: ["/assets/images/food/coffee-2.jpg"],
        history: "Popular cold coffee drink."
    },
    {
        name: "Cappuccino",
        description: "Espresso with steamed milk and foam.",
        category: "Beverage",
        isSignature: false,
        images: ["/assets/images/food/coffee-3.jpg"],
        history: "Classic Italian coffee."
    },
    // New Additions
    {
        name: "Spanish Latte",
        description: "Espresso with condensed milk and textured milk. Sweet and creamy.",
        category: "Beverage",
        isSignature: true,
        images: ["/assets/images/food/coffee-2.jpg"],
        history: "A local favorite twist on the latte."
    },
    {
        name: "White Chocolate Mocha",
        description: "Espresso with white chocolate sauce and steamed milk.",
        category: "Beverage",
        isSignature: true,
        images: ["/assets/images/food/coffee-3.jpg"],
        history: "Sweet and indulgent."
    },
    {
        name: "Mango Smoothie",
        description: "Refreshing smoothie made with ripe mangoes.",
        category: "Beverage",
        isSignature: true,
        images: ["/assets/images/food/halo-halo.jpg"], // Placeholder
        history: "Philippines is famous for its mangoes."
    },
    {
        name: "Sisig",
        description: "Sizzling chopped pork face and ears, seasoned with calamansi and chili.",
        category: "Meat Dish",
        isSignature: true,
        images: ["/assets/images/food/kikiam.jpg"], // Placeholder
        history: "The ultimate pulutan."
    }
];

const culturalStories = [
    {
        title: "The Legend of Pancit Malabon",
        content: "Pancit Malabon originated from the abundance of seafood in the area. Fishermen's wives would cook noodles with whatever fresh catch was available, creating the rich, seafood-heavy sauce we know today.",
        type: "History",
        image: "/assets/images/culture/pancit-history.jpg",
        tags: ["Food History", "Legend"]
    },
    {
        title: "San Bartolome Church",
        content: "Built in 1614, the San Bartolome Church is a testament to Malabon's deep religious roots and Spanish colonial history. Its architecture reflects the Greco-Roman style.",
        type: "Landmark",
        image: "/assets/images/culture/church.jpg",
        tags: ["Architecture", "History"]
    },
    {
        title: "The Floods and Resilience",
        content: "Malabon is known for its frequent flooding due to its low-lying geography. However, the people of Malabon have adapted with resilience, often using boats for transport and elevating their homes.",
        type: "Tradition",
        image: "/assets/images/culture/flood.jpg",
        tags: ["Resilience", "Modern Life"]
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Clear existing data
        await Business.deleteMany({});
        await Food.deleteMany({});
        await CulturalStory.deleteMany({});
        console.log('🗑️  Cleared existing data\n');

        // 1. Insert Foods first
        const createdFoods = await Food.insertMany(foodsData);
        console.log(`✅ Created ${createdFoods.length} food items`);

        // Helper to find food ID by name
        const getFoodId = (name) => {
            const food = createdFoods.find(f => f.name === name);
            return food ? food._id : null;
        };

        // 2. Prepare Businesses with Menu Items linked
        const manualBusinesses = [
            // Restaurants
            {
                google_place_id: 'manual_1',
                name: "Nanay's Pancit Malabon",
                description: "The home of the original Pancit Malabon since the 1960s. Famous for its rich, authentic flavor and generous toppings.",
                address: "37 Governor Pascual Avenue, Concepcion, Malabon City",
                category: "Restaurant",
                rating: 4.8,
                images: ["/assets/images/food/pancit-malabon.png"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Pancit Malabon"), getFoodId("Kikiam")].filter(Boolean)
            },
            {
                google_place_id: 'manual_2',
                name: "Dolor's Kakanin",
                description: "Famous for their Sapin-Sapin and other traditional Filipino rice cakes. A Malabon institution since 1930.",
                address: "19 Governor Pascual Avenue, Concepcion, Malabon City",
                category: "Bakery",
                rating: 4.9,
                images: ["/assets/images/food/dolors-sapin-sapin.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Sapin-Sapin"), getFoodId("Pichi-Pichi")].filter(Boolean)
            },
            {
                google_place_id: 'manual_3',
                name: "Judy Ann's Crispy Pata (Jamico's)",
                description: "Home of the famous Judy Ann's Crispy Pata. A beloved family restaurant serving classic Filipino comfort food with a unique sweet glaze.",
                address: "201 General Luna Street, Concepcion, Malabon City",
                category: "Restaurant",
                rating: 4.7,
                images: ["/assets/images/food/crispy-pata.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Crispy Pata"), getFoodId("Sinigang na Hipon")].filter(Boolean)
            },
            {
                google_place_id: 'manual_4',
                name: "Betsy's Cake Center",
                description: "Known for their soft broas and classic cakes like the 'Branzival'. A favorite stop for sweets and pastries.",
                address: "10 Rizal Avenue, Malabon City",
                category: "Bakery",
                rating: 4.6,
                images: ["/assets/images/food/broas.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Broas")].filter(Boolean)
            },
            {
                google_place_id: 'manual_5',
                name: "Cocina Luna",
                description: "A modern pub and restaurant offering a fusion of traditional Malabon dishes and contemporary cuisine like Pulled Pork Sliders.",
                address: "144 General Luna Street, Malabon City",
                category: "Restaurant",
                rating: 4.5,
                images: ["/assets/images/food/rellenong-bangus.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Rellenong Bangus"), getFoodId("Adobong Pusit")].filter(Boolean)
            },
            {
                google_place_id: 'manual_9',
                name: "Valeriano's Eatery",
                description: "A beloved family-run institution since 1978, renowned for its beef mami, siopao, and pancit.",
                address: "12 T. Santos Street, Barangay Baritan, Malabon City",
                category: "Restaurant",
                rating: 4.6,
                images: ["/assets/images/food/pancit-malabon.png"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Pancit Malabon")].filter(Boolean)
            },
            {
                google_place_id: 'manual_10',
                name: "Red Palmas Restaurant",
                description: "A classic dining spot in San Vicente offering hearty Filipino meals.",
                address: "Panghulo Road, San Vicente, Malabon City",
                category: "Restaurant",
                rating: 4.3,
                images: ["/assets/images/food/malabon-chicken.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Sinigang na Hipon")].filter(Boolean)
            },
            {
                google_place_id: 'manual_11',
                name: "Mila Flores Pancit Malabon",
                description: "Noted for serving a delicious version of the popular dish and quality milk teas.",
                address: "51 General Luna Street, Malabon City",
                category: "Restaurant",
                rating: 4.4,
                images: ["/assets/images/food/pancit-malabon.png"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Pancit Malabon")].filter(Boolean)
            },
            {
                google_place_id: 'manual_18',
                name: "Amber Golden Chain of Restaurants",
                description: "Well-regarded for its wide range of Filipino dishes, particularly its Pancit Malabon and Pichi-Pichi.",
                address: "Malabon City",
                category: "Restaurant",
                rating: 4.5,
                images: ["/assets/images/food/pancit-malabon.png"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Pancit Malabon"), getFoodId("Pichi-Pichi")].filter(Boolean)
            },
            {
                google_place_id: 'manual_19',
                name: "Conti's Bakeshop & Restaurant",
                description: "A popular casual dining spot known for delightful cakes, pastries, and heartwarming dishes.",
                address: "Malabon City",
                category: "Restaurant",
                rating: 4.7,
                images: ["/assets/images/food/broas.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Broas")].filter(Boolean)
            },
            {
                google_place_id: 'manual_20',
                name: "Gerry's Restaurant and Bar",
                description: "Offers a pleasurable dining experience with Filipino favorites such as Sisig, Inihaw na Pusit, and Crispy Pata.",
                address: "Malabon City",
                category: "Restaurant",
                rating: 4.6,
                images: ["/assets/images/food/crispy-pata.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Crispy Pata"), getFoodId("Sinigang na Hipon")].filter(Boolean)
            },

            // Cafes
            {
                google_place_id: 'manual_6',
                name: "Stay Up Espresso Bar",
                description: "A cozy coffee shop in Malabon serving artisanal coffee and pastries. A perfect spot for students and remote workers.",
                address: "General Luna St, Malabon",
                category: "Cafe",
                rating: 4.7,
                images: ["/assets/images/food/coffee-1.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Espresso"), getFoodId("Iced Latte"), getFoodId("Cappuccino")].filter(Boolean)
            },
            {
                google_place_id: 'manual_7',
                name: "Cups & Cones",
                description: "Delightful cafe offering a wide variety of coffee blends and sweet treats. Known for their relaxing ambiance.",
                address: "Rizal Avenue, Malabon City",
                category: "Cafe",
                rating: 4.6,
                images: ["/assets/images/food/coffee-2.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Espresso"), getFoodId("Iced Latte")].filter(Boolean)
            },
            {
                google_place_id: 'manual_8',
                name: "Beans & Berries",
                description: "Specialty coffee and fruit blends. A popular hangout spot for locals looking for refreshing drinks.",
                address: "Governor Pascual Ave, Malabon City",
                category: "Cafe",
                rating: 4.5,
                images: ["/assets/images/food/coffee-3.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Espresso"), getFoodId("Cappuccino")].filter(Boolean)
            },
            {
                google_place_id: 'manual_12',
                name: "G Cafe",
                description: "A newly opened, cozy, and chill coffee spot known for its freshly brewed coffee.",
                address: "In front of Robinsons Malabon",
                category: "Cafe",
                rating: 4.5,
                images: ["/assets/images/food/coffee-1.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Espresso"), getFoodId("Iced Latte")].filter(Boolean)
            },
            {
                google_place_id: 'manual_13',
                name: "Blend43 Cafe",
                description: "An industrial-style coffee shop offering good coffee and snacks. Open late.",
                address: "Malabon City",
                category: "Cafe",
                rating: 4.4,
                images: ["/assets/images/food/coffee-2.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Espresso")].filter(Boolean)
            },
            {
                google_place_id: 'manual_14',
                name: "Marchello",
                description: "A neighborhood cafe offering fresh ground coffee drinks, juices, and pastries.",
                address: "129 Gen. Luna St., Malabon",
                category: "Cafe",
                rating: 4.6,
                images: ["/assets/images/food/coffee-3.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Cappuccino")].filter(Boolean)
            },
            {
                google_place_id: 'manual_15',
                name: "Pedal Cafe - Malabon",
                description: "A cyclist-friendly spot where you can enjoy a good cup of your favorite drink.",
                address: "SkyPlaza Victoneta, Victoneta Avenue",
                category: "Cafe",
                rating: 4.7,
                images: ["/assets/images/food/coffee-1.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Iced Latte")].filter(Boolean)
            },
            {
                google_place_id: 'manual_16',
                name: "Half&Half",
                description: "An aesthetic cafe in Malabon featuring both indoor and outdoor seating.",
                address: "Malabon City",
                category: "Cafe",
                rating: 4.5,
                images: ["/assets/images/food/coffee-2.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Espresso")].filter(Boolean)
            },
            {
                google_place_id: 'manual_17',
                name: "Lotus Prime Cafe",
                description: "A hangout spot for both day and night in Maysilo, Malabon.",
                address: "Maysilo, Malabon",
                category: "Cafe",
                rating: 4.3,
                images: ["/assets/images/food/coffee-3.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Cappuccino")].filter(Boolean)
            },
            // NEW ADDITIONS
            {
                google_place_id: 'manual_21',
                name: "Artemis Coffee",
                description: "A popular spot in General Luna offering a wide range of frappes and crafted coffee beverages.",
                address: "General Luna St, Malabon City",
                category: "Cafe",
                rating: 4.6,
                images: ["/assets/images/businesses/artemis.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("White Chocolate Mocha"), getFoodId("Cappuccino")].filter(Boolean)
            },
            {
                google_place_id: 'manual_22',
                name: "Orijins Coffee House",
                description: "Specialty coffee house serving high-quality espresso-based drinks like Cortado and Ristretto.",
                address: "418 General Luna St, Bayan Bayanan, Baritan, Malabon City",
                category: "Cafe",
                rating: 4.8,
                images: ["/assets/images/businesses/orijins.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Espresso"), getFoodId("Cappuccino")].filter(Boolean)
            },
            {
                google_place_id: 'manual_23',
                name: "But First, Coffee (BFC)",
                description: "Known for their Spanish Latte and Vietnamese Style coffee. A great place for both hot and iced coffee lovers.",
                address: "33 Governor Pascual Avenue, Malabon City",
                category: "Cafe",
                rating: 4.7,
                images: ["/assets/images/businesses/bfc.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Spanish Latte"), getFoodId("Iced Latte")].filter(Boolean)
            },
            {
                google_place_id: 'manual_24',
                name: "Tastes from the Greens",
                description: "Offers a refreshing variety of milk teas, fruit smoothies, and coffee. Famous for their Mango Series.",
                address: "59 General Luna St, Malabon City",
                category: "Cafe",
                rating: 4.5,
                images: ["/assets/images/businesses/tastes.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Mango Smoothie")].filter(Boolean)
            },
            {
                google_place_id: 'manual_25',
                name: "Antahan Café",
                description: "A cozy spot for pastries, pasta, and Filipino favorites like Sisig. Perfect for hanging out.",
                address: "28 Pureza St, Malabon City",
                category: "Cafe",
                rating: 4.4,
                images: ["/assets/images/businesses/antahan.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Sisig"), getFoodId("Cappuccino")].filter(Boolean)
            },
            {
                google_place_id: 'manual_26',
                name: "Cafe Cera",
                description: "A relaxing cafe on Victoneta Avenue, great for studying or casual meetups.",
                address: "77 Victoneta Ave, Malabon City",
                category: "Cafe",
                rating: 4.5,
                images: ["/assets/images/businesses/cera.jpg"],
                location: { type: 'Point', coordinates: [120.95, 14.66] },
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
                menu_items: [getFoodId("Iced Latte")].filter(Boolean)
            }
        ];

        // 3. Insert Businesses
        const createdBusinesses = await Business.insertMany(manualBusinesses);
        console.log(`✅ Created ${createdBusinesses.length} businesses in database`);

        // 4. Insert Cultural Stories
        const createdStories = await CulturalStory.insertMany(culturalStories);
        console.log(`✅ Created ${createdStories.length} cultural stories`);

        console.log('\n🎉 Database seeded successfully with curated data!');
        console.log(`\n📈 Summary:\n   - Businesses: ${createdBusinesses.length}\n   - Foods: ${createdFoods.length}\n   - Cultural Stories: ${createdStories.length}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
