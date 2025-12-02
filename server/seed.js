import Business from './models/Business.js';
import Food from './models/Food.js';
import CulturalStory from './models/CulturalStory.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { searchPlaces, getPlaceDetails, getPhotoUrl } from './services/googleApi.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taste-of-malabon';

// Malabon food items with real descriptions
const malabonFoods = [
    {
        name: 'Pancit Malabon',
        description: 'Thick rice noodles with rich orange shrimp-based sauce, topped with chicharrón, boiled eggs, shrimp, tinapa flakes, and oysters/squid.',
        history: 'The signature dish of Malabon City, created by Chinese immigrants who combined thick rice noodles with abundant seafood from Manila Bay.',
        category: 'Main Dish',
        is_signature: true,
        ingredients: ['thick rice noodles', 'shrimp', 'squid', 'smoked fish', 'eggs', 'shrimp sauce', 'chicharron'],
        cultural_significance: 'Pancit Malabon is the pride of Malabon City and holds the Guinness World Record for the longest line of noodle bowls.',
        image_url: '/assets/images/food/pancit-malabon.png'
    },
    {
        name: 'Puto Bumbong / Sulot',
        description: 'Malabon\'s version is softer, moist, made with real pirurutong, and has generous toppings of margarine, niyog, and brown sugar.',
        history: 'Traditionally served during Christmas season, Malabon\'s version uses authentic pirurutong (purple rice) giving it a distinct flavor and texture.',
        category: 'Snack',
        is_signature: true,
        ingredients: ['pirurutong rice', 'coconut', 'brown sugar', 'margarine'],
        where_to_buy: 'Available at Malabon Public Market, Concepcion Market, and various street vendors during the Christmas season (September-January).',
        image_url: '/assets/images/food/puto-bumbong.jpg'
    },
    {
        name: 'Dolor\'s Sapin-Sapin',
        description: 'Nationally known for its clean layers, unique flavors, custard-like texture, and old family recipe.',
        history: 'Established in 1930, Dolor\'s Kakanin has been producing sapin-sapin using a secret family recipe passed down through four generations.',
        category: 'Dessert',
        is_signature: true,
        ingredients: ['glutinous rice flour', 'coconut milk', 'ube', 'jackfruit'],
        cultural_significance: 'Dolor\'s Sapin-Sapin is considered a national treasure and is often given as gifts to visiting dignitaries and celebrities.',
        where_to_buy: 'Dolor\'s Kakanin - Concepcion, Malabon City. Open daily 6:00 AM - 6:00 PM. Also available at select SM Supermarkets.',
        image_url: '/assets/images/food/dolors-sapin-sapin.jpg'
    },
    {
        name: 'Crispy Okoy',
        description: 'Deep-fried shrimp fritters made with squash or bean sprouts. Best dipped in spicy vinegar.',
        category: 'Street Food',
        ingredients: ['shrimp', 'squash', 'bean sprouts', 'flour'],
        cooking_instructions: 'Mix shredded squash or bean sprouts with small shrimp and batter. Deep fry in hot oil until golden and crispy. Serve immediately with spiced vinegar dip.',
        where_to_buy: 'Street vendors along Dagat-Dagatan Avenue and near Malabon Public Market. Best enjoyed fresh and hot in the afternoon (3-6 PM).',
        image_url: '/assets/images/food/okoy.jpg'
    },
    {
        name: 'Rellenong Bangus',
        description: 'Stuffed Milkfish. A labor-intensive dish where the fish meat is flaked, seasoned, and stuffed back into the skin before frying.',
        history: 'A traditional Filipino dish elevated by Malabon\'s fishing heritage. The abundance of fresh bangus from Manila Bay made this a local specialty.',
        category: 'Specialty',
        ingredients: ['bangus', 'vegetables', 'raisins', 'eggs'],
        cooking_instructions: 'Carefully remove bangus meat while keeping skin intact. Mix deboned meat with sautéed vegetables, raisins, and eggs. Stuff back into skin, sew closed, and deep fry until golden brown.',
        where_to_buy: 'Concepcion Market (fresh bangus for home cooking), Jamico\'s Restaurant (ready-to-eat), and various carinderia along Letre Road.',
        image_url: '/assets/images/food/rellenong-bangus.jpg'
    },
    {
        name: 'Adobong Pusit',
        description: 'Squid stewed in vinegar, soy sauce, and squid ink. A savory and tangy seafood classic.',
        category: 'Main Dish',
        ingredients: ['squid', 'vinegar', 'soy sauce', 'garlic', 'squid ink'],
        cooking_instructions: 'Sauté garlic, add cleaned squid. Pour vinegar and soy sauce, simmer until tender. Add squid ink for rich black color. Best served with steamed rice.',
        where_to_buy: 'Fresh squid available at Malabon Fish Market daily. Ready-to-eat versions at Jamico\'s Restaurant and local carinderias.',
        image_url: '/assets/images/food/adobong-pusit.jpg'
    },
    {
        name: 'Tinapa (Smoked Fish)',
        description: 'A signature product of the fishing community. Includes Tinapang Bangus, Salinas, and Galunggong.',
        history: 'Smoking fish has been a preservation method in Malabon for centuries. The technique was perfected by local fishermen to extend the shelf life of their catch.',
        category: 'Appetizer',
        ingredients: ['bangus', 'salt', 'smoke'],
        cultural_significance: 'Tinapa is a symbol of Malabon\'s fishing heritage and is exported nationwide. The distinct smoky flavor comes from traditional wood-smoking methods.',
        where_to_buy: 'Malabon Fish Market, Concepcion Market, and roadside vendors along Dagat-Dagatan Avenue. Best purchased early morning (5-8 AM) for freshest batches.',
        image_url: '/assets/images/food/tinapa.jpg'
    },
    {
        name: 'Sumpia',
        description: 'Malabon Spring Rolls. Crispy small fried rolls with sweet-savory green papaya filling.',
        category: 'Street Food',
        ingredients: ['green papaya', 'shrimp', 'spring roll wrapper'],
        image_url: '/assets/images/food/sumpia.jpg'
    },
    {
        name: 'Broas',
        description: 'Ladyfinger biscuits sold by traditional bakeries. Known for their airy texture and mild sweetness.',
        category: 'Snack',
        ingredients: ['flour', 'eggs', 'sugar'],
        image_url: '/assets/images/food/broas.jpg'
    },
    {
        name: 'Kakanin Mix',
        description: 'A wide variety of tray-sold delights: Kutsinta, Biko, Ube Halaya, Pichi-Pichi, Cassava Cake, and Puto Kutsinta.',
        category: 'Snack',
        ingredients: ['rice flour', 'coconut milk', 'sugar', 'ube'],
        image_url: '/assets/images/food/kakanin-mix.jpg'
    },
    {
        name: 'Crispy Pata',
        description: 'Jamico\'s Restaurant version is famous across Metro Manila. Perfectly crispy skin and tender meat.',
        category: 'Main Dish',
        ingredients: ['pork leg', 'salt', 'pepper', 'oil'],
        image_url: '/assets/images/food/crispy-pata.jpg'
    },
    {
        name: 'Malabon Fried Chicken',
        description: 'Local homegrown style marinated in old-style recipes. Distinct from commercial fast food.',
        category: 'Main Dish',
        ingredients: ['chicken', 'garlic', 'soy sauce', 'calamansi'],
        image_url: '/assets/images/food/malabon-chicken.jpg'
    }
];

// Cultural stories
const culturalStories = [
    {
        title: 'The History of Pancit Malabon',
        summary: 'How Malabon\'s signature noodle dish became a Filipino favorite',
        content: 'Pancit Malabon originated in the 1960s in Malabon City, Metro Manila. Unlike other pancit varieties, it uses thick rice noodles and is characterized by its rich, orange-colored shrimp sauce. The dish reflects Malabon\'s coastal heritage and fishing industry. In 2025, Malabon set a Guinness World Record with 6,549 bowls of Pancit Malabon lined up in a single event.',
        type: 'Food Culture',
        tags: ['pancit', 'history', 'food', 'heritage', 'guinness'],
        published: true,
    },
    {
        title: 'Malabon: The Fishing Capital',
        summary: 'Exploring Malabon\'s rich fishing heritage and waterways',
        content: 'Malabon City has a long history as a fishing community. Its location along Manila Bay and numerous waterways made it a natural hub for fishing and seafood trade. This heritage is reflected in the city\'s cuisine, which heavily features seafood like tinapa, bangus, and various shellfish.',
        type: 'History',
        tags: ['fishing', 'heritage', 'history', 'seafood'],
        published: true,
    },
    {
        title: 'Dolor\'s Kakanin: A Family Legacy',
        summary: 'The story behind Malabon\'s most famous sapin-sapin',
        content: 'Since 1930, Dolor\'s Kakanin has been producing the finest sapin-sapin in the Philippines. The family recipe, passed down through generations, creates perfectly layered rice cakes with a unique custard-like texture that has made them a national treasure.',
        type: 'Food Culture',
        tags: ['kakanin', 'sapin-sapin', 'family business', 'tradition'],
        published: true,
    }
];

// Search queries for Google Places
const searchQueries = [
    { query: 'Pancit Malabon restaurant', type: 'restaurant' },
    { query: 'Jamico restaurant Malabon', type: 'restaurant' },
    { query: 'Dolor kakanin Malabon', type: 'bakery' },
    { query: 'Malabon market', type: 'store' },
    { query: 'restaurant Malabon', type: 'restaurant' },
    { query: 'bakery Malabon', type: 'bakery' },
    { query: 'food Malabon', type: 'restaurant' }
];

async function fetchBusinessesFromGoogle() {
    const businesses = [];
    console.log('🔍 Searching Google Places for Malabon businesses...\n');

    for (const { query, type } of searchQueries) {
        try {
            console.log(`   Searching: "${query}"...`);
            const results = await searchPlaces(query, type);

            for (const place of results.slice(0, 3)) { // Limit to 3 per query
                try {
                    const details = await getPlaceDetails(place.place_id);

                    // Extract photos
                    const images = details.photos
                        ? details.photos.slice(0, 3).map(photo => getPhotoUrl(photo.photo_reference))
                        : [];

                    const business = {
                        google_place_id: place.place_id,
                        name: details.name,
                        description: details.editorial_summary?.overview || `A local ${type} in Malabon City.`,
                        address: details.formatted_address,
                        location: {
                            type: 'Point',
                            coordinates: [
                                details.geometry.location.lng,
                                details.geometry.location.lat
                            ]
                        },
                        category: type.charAt(0).toUpperCase() + type.slice(1),
                        rating: details.rating || 0,
                        images: images,
                        contact: {
                            phone: details.formatted_phone_number
                        },
                        social_links: {
                            website: details.website
                        }
                    };

                    businesses.push(business);
                    console.log(`   ✅ Found: ${business.name}`);
                } catch (detailError) {
                    console.log(`   ⚠️  Could not get details for ${place.name}`);
                }
            }

            // Add delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.log(`   ❌ Error searching "${query}": ${error.message}`);
        }
    }

    return businesses;
}

async function seedDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Clear existing data
        await Business.deleteMany({});
        await Food.deleteMany({});
        await CulturalStory.deleteMany({});
        console.log('🗑️  Cleared existing data\n');

        // Fetch businesses from Google Places API
        const googleBusinesses = await fetchBusinessesFromGoogle();

        // Remove duplicates by google_place_id
        const uniqueBusinesses = [];
        const seenIds = new Set();
        for (const business of googleBusinesses) {
            if (!seenIds.has(business.google_place_id)) {
                seenIds.add(business.google_place_id);
                uniqueBusinesses.push(business);
            }
        }

        console.log(`\n📊 Found ${uniqueBusinesses.length} unique businesses from Google Places\n`);

        // Insert businesses
        if (uniqueBusinesses.length > 0) {
            const businesses = await Business.insertMany(uniqueBusinesses);
            console.log(`✅ Created ${businesses.length} businesses in database`);
        } else {
            console.log('⚠️  No businesses found from Google Places API');
        }

        // Insert foods
        const foods = await Food.insertMany(malabonFoods);
        console.log(`✅ Created ${foods.length} food items`);

        // Insert cultural stories
        const stories = await CulturalStory.insertMany(culturalStories);
        console.log(`✅ Created ${stories.length} cultural stories`);

        console.log('\n🎉 Database seeded successfully with real data!');
        console.log(`\n📈 Summary:`);
        console.log(`   - Businesses: ${uniqueBusinesses.length}`);
        console.log(`   - Foods: ${foods.length}`);
        console.log(`   - Cultural Stories: ${stories.length}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
