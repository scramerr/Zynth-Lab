import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { question } = await req.json();

    const FAQ_CONTEXT = `
You are a helpful assistant. Use ONLY the following FAQ information to answer user questions. If the answer is not found, say: "I'm not sure about that. Please contact support."

FAQs:
- Business hours: 9AM to 5PM, Monday to Friday
- Contact support: support@example.com or our contact form
- Return policy: Returns accepted within 30 days with original packaging
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: FAQ_CONTEXT,
                },
                {
                    role: "user",
                    content: question,
                },
            ],
            temperature: 0.5,
        }),
    });

    const data = await response.json();
    console.log("🧠 OpenAI Full Response:", JSON.stringify(data, null, 2));

    const answer =
        data.choices?.[0]?.message?.content?.trim() ||
        "Sorry, I couldn't find the answer.";

    return NextResponse.json({ answer });
}
