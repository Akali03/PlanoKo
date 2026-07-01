import { client } from "../config/huggingface.js";


export const summarizeTasks = async(tasks) => {
    const chatCompletion = await client.chat.completions.create({
        model: "Qwen/Qwen3-4B-Instruct-2507:nscale",
        messages: [
            {
                role: "system",
                content: `Please:
                        - Summarize my tasks in 2-3 sentences.
                        - Tell me which tasks to prioritize and why.
                        - Mention any overdue or upcoming deadlines.
                        - Suggest the best order to complete them.
                        - Keep the response under 120 words`,
            },
            {
                role: "user",
                content: JSON.stringify(tasks),
            },
        ],
    });
    console.log(chatCompletion.choices[0].message);
    console.log(chatCompletion.usage);
    return chatCompletion.choices[0].message;
}


