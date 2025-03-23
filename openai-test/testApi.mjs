

import { GoogleGenerativeAI } from "@google/generative-ai";

async function main() {
  const genAI = new GoogleGenerativeAI("AIzaSyBSo2hOo8FamGVkzLJeVyrmHwxQ8gkJYJQ");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = "how many people live in the world?";

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}
main();