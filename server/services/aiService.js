import axios from 'axios';

/**
 * Generate AI-enhanced description using Gemini API
 */
export async function generateDescription(prompt, context = '') {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.warn('Gemini API key not configured, returning basic response');
        return `${prompt} ${context}`.trim();
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `${prompt}\n\nContext: ${context}`,
                            },
                        ],
                    },
                ],
            }
        );

        const generatedText = response.data.candidates[0]?.content?.parts[0]?.text;
        return generatedText || prompt;
    } catch (error) {
        console.error('Error generating AI description:', error.message);
        return prompt;
    }
}

/**
 * Enhance business description
 */
export async function enhanceBusinessDescription(businessName, category, location) {
    const prompt = `Write a compelling 2-3 sentence description for "${businessName}", a ${category} located in ${location}, Malabon City. Focus on what makes it special and appealing to food lovers.`;

    return await generateDescription(prompt);
}

/**
 * Enhance food description with cultural context
 */
export async function enhanceFoodDescription(foodName, ingredients = '', history = '') {
    const prompt = `Write an engaging 2-3 sentence description for "${foodName}", a traditional Malabon dish. ${ingredients ? `It contains: ${ingredients}.` : ''
        } ${history ? `Historical context: ${history}` : ''} Make it appetizing and culturally rich.`;

    return await generateDescription(prompt);
}

/**
 * Summarize reviews
 */
export async function summarizeReviews(reviews) {
    if (!reviews || reviews.length === 0) {
        return 'No reviews available yet.';
    }

    const reviewTexts = reviews.map((r) => r.text).join('\n');
    const prompt = `Summarize the following customer reviews in 2-3 sentences, highlighting common themes and overall sentiment:\n\n${reviewTexts}`;

    return await generateDescription(prompt);
}

/**
 * Generate cultural story content
 */
export async function generateCulturalContent(topic, type = 'history') {
    const prompt = `Write an informative and engaging article about "${topic}" in Malabon City, Philippines. Focus on ${type}. Include interesting facts and cultural significance. Write 3-4 paragraphs.`;

    return await generateDescription(prompt);
}

/**
 * Suggest related items
 */
export async function suggestRelated(itemName, itemType = 'food') {
    const prompt = `Given "${itemName}" (a ${itemType} from Malabon), suggest 5 related ${itemType}s that visitors might also enjoy. Return as a comma-separated list.`;

    const response = await generateDescription(prompt);
    return response.split(',').map((item) => item.trim());
}
