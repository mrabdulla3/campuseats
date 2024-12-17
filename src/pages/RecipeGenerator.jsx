import React, { useState } from "react";
import Groq from "groq-sdk";
import { motion, AnimatePresence } from "framer-motion";
import "tailwindcss/tailwind.css";

const groq = new Groq({
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [mealType, setMealType] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const generateRecipe = async () => {
    setLoading(true);
    setRecipe("");

    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Generate a ${mealType} ${cuisine} recipe using the following ingredients: ${ingredients}, and taking less than ${prepTime} minutes to prepare.`,
          },
        ],
        model: "gemma2-9b-it",
      });

      setRecipe(
        completion.choices[0].message.content ||
          "No recipe found. Please refine your input."
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-purple-800 p-8 flex flex-col items-center">
      {/* Page Title */}
      <motion.h1
        className="text-5xl font-bold text-white mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Bawarchi
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
        {/* Input Section */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-lg sticky top-10 h-fit md:w-1/3"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-6">
            <label
              htmlFor="ingredients"
              className="block text-gray-700 font-semibold mb-2"
            >
              Ingredients (comma-separated):
            </label>
            <input
              type="text"
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="e.g., eggs, flour, sugar"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="prepTime"
              className="block text-gray-700 font-semibold mb-2"
            >
              Preparation Time (minutes):
            </label>
            <input
              type="number"
              id="prepTime"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="e.g., 30"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="cuisine"
              className="block text-gray-700 font-semibold mb-2"
            >
              Cuisine Type:
            </label>
            <input
              type="text"
              id="cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="e.g., Italian, Indian"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="mealType"
              className="block text-gray-700 font-semibold mb-2"
            >
              Meal Type:
            </label>
            <select
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <option value="" disabled>
                Select Meal Type
              </option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Snacks">Snacks</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          <motion.button
            onClick={generateRecipe}
            disabled={loading}
            className={`w-full py-3 mt-4 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Generating..." : "Generate Recipe"}
          </motion.button>
        </motion.div>

        {/* Recipe Section - Dynamically Expands */}
        <div className="flex-1">
          <AnimatePresence>
            {recipe && (
              <motion.div
                className="bg-white p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Recipe:
                </h2>
                <motion.p
                  className="text-gray-700 whitespace-pre-wrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {recipe}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="mt-10 text-white text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Created with <span className="text-red-500">♥</span> by Namit
      </motion.footer>
    </div>
  );
};

export default RecipeGenerator;
