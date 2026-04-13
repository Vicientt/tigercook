import { Clock, DollarSign, Users, Heart, Search } from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Input } from "../components/ui/input.jsx";
import Recipes from "../utils/recipes.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Explore() {
  const recipes = Recipes.recipes;
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const recipesFilter = recipes.filter((dish) =>
    dish.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleRecipeClick = (recipe) => {
    localStorage.setItem("currentRecipe", JSON.stringify(recipe));
    localStorage.removeItem("currentRecipeSavedToFirestore");
    navigate("/ai-result", {
      state: {from: "explore"}
    })
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5]">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl mb-2 font-extrabold">Explore Recipes</h1>
          <p className="text-gray-600">Browse through our collection of student-friendly recipes</p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search recipes..."
              className="pl-12 h-12 rounded-xl border-2 border-gray-200 focus:border-[#FF7A00] bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipesFilter.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => handleRecipeClick(recipe)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-[#FF7A00] text-white text-xs px-2 py-1 rounded-lg font-semibold">
                    {recipe.category}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all"
                  >
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-base mb-2 font-bold">{recipe.title}</h3>

                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    <span>{recipe.cost}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{recipe.servings}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
