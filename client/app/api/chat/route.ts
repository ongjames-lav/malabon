import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { messages, context } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "No API key configured" }, { status: 500 });
        }

        const systemInstruction = `You are Buddy, the official AI travel guide for Malabon City, known as the "Venice of the North". Keep your answers extremely concise, friendly, and structured. Always use emojis. ONLY answer questions about Malabon. If asked about other places, politely decline. Here is some local data you must use to inform your answers:\n\n${context}`;

        const formattedMessages = messages
            .map((m: any) => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }]
            }));

        // Prepend system instructions to the first user message for compatibility
        if (formattedMessages.length > 0) {
            formattedMessages[0].parts[0].text = systemInstruction + "\n\nUser Query:\n" + formattedMessages[0].parts[0].text;
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: formattedMessages,
                generationConfig: { temperature: 0.7, maxOutputTokens: 800 }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            throw new Error("No response generated");
        }

        return NextResponse.json({ text });

    } catch (error: any) {
        console.error("Chat API Error:", error.message);
        return NextResponse.json({ error: "Failed to generate AI response." }, { status: 500 });
    }
}
