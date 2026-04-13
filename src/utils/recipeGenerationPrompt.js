export function buildRecipeGenerationPrompt({
  budget,
  portion,
  diet,
  cuisine,
  cookingTime,
}) {
  const cuisineGuide =
    cuisine === "any"
      ? `Pick ONE specific cuisine at random from this list and fully commit to it: Italian, Mexican, Middle Eastern, Korean, Indian, American Southern, French, Thai, Spanish, Greek, Japanese, Vietnamese, Moroccan, Ethiopian, or Brazilian. Do NOT default to generic Asian dishes or bowls.`
      : `The cuisine is ${cuisine}. Pick a specific, authentic regional dish from that cuisine — not a generic bowl or stir-fry.`;

  const dietGuide =
    diet === "any"
      ? `The dish can use any protein: chicken, beef, pork, seafood, eggs, tofu, legumes, etc.`
      : `The diet is strictly ${diet}. Every ingredient must comply with this.`;

  const randomSeed = Math.floor(Math.random() * 10000);

  return `You are a creative chef. Your task is to generate a unique, specific recipe. Use seed ${randomSeed} to randomize your output.

Strict rules:
- DO NOT generate dishes named "bowl", "stir-fry wrap", "rice bowl", or any generic fusion dish unless the recipe is authentically named that way in its cuisine.
- Give the dish its REAL culinary name (e.g., "Shakshuka", "Chicken Piccata", "Pho Bo", "Moussaka", "Chiles en Nogada").
- NEVER generate the same dish twice in a row. Be creative and pick something unexpected.

Requirements:
- Budget: $${budget} total for all ingredients combined
- Servings: ${portion} people
- ${dietGuide}
- ${cuisineGuide}
- Cooking time: under ${cookingTime} minutes
- Must be realistic for a college student with a basic stovetop, oven, and standard utensils
- Give exactly 5–7 cooking steps. Each step must be 1–2 sentences with specific details: temperatures (°F/°C), cooking times, visual cues, and technique names.
- Ingredient list must be precise: quantities, units, and preparation state (e.g., "2 cloves garlic, minced" not just "garlic")

Return ONLY valid JSON — no markdown, no code fences, no explanation text before or after:
{
  "title": "Authentic Dish Name",
  "description": "2 sentences describing the dish's flavor profile and what makes it special",
  "ingredients": [
    { "name": "ingredient with prep note", "amount": "precise amount + unit" }
  ],
  "steps": [
    "Step with specific temp/time/technique...",
    "..."
  ],
  "time": "${cookingTime} min",
  "cost": "$${budget}",
  "servings": ${portion},
  "tag": "one evocative word: Smoky, Crispy, Creamy, Tangy, Spicy, Hearty, Aromatic, Fresh, Umami, etc.",
  "nutrition": {
    "calories": 000,
    "protein": "Xg",
    "carbs": "Xg",
    "fat": "Xg"
  }
}`;
}
