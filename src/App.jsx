import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import Layout from "./Pages/Layout";
import LoggedInLayout from "./Pages/LoggedInLayout";
import Recipes from "./Pages/Recipes";
import LoggedIn from "./Pages/LoggedIn";
import AddRecipes from "./Pages/AddRecipes";
import AllRecipes from "./Components/AllRecipes";
import StewRecipes from "./Components/StewRecipes";
import SoupRecipes from "./Components/SoupRecipes";
import RiceRecipes from "./Components/RiceRecipes";
import RecipeDetails from "./Pages/RecipeDetails";
import ProtectedRoute from "./Components/AuthRoutes/ProtectedRoutes";
import RedirectIfAuthenticated from "./Components/AuthRoutes/RedirectIfAuthenticated";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Not logged in */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
        </Route>

        {/* Logged In */}
        <Route
          path="/loggedIn"
          element={
            <ProtectedRoute>
              <LoggedInLayout />
            </ProtectedRoute>
          }
        >
          <Route index element= { <LoggedIn />} />
          <Route path="/loggedIn/Recipes" element={<Recipes />}>
            <Route index element={<AllRecipes />} />
            <Route
              path="/loggedIn/Recipes/riceRecipes"
              element={<RiceRecipes />}
            />
            <Route
              path="/loggedIn/Recipes/soupRecipes"
              element={<SoupRecipes />}
            />
            <Route
              path="/loggedIn/Recipes/stewRecipes"
              element={<StewRecipes />}
            />
            <Route path="/loggedIn/Recipes/:id" element={<RecipeDetails />} />
          </Route>
        </Route>

        {/* Pages details */}
        <Route
          path="/addRecipe"
          element={
            <ProtectedRoute>
              <AddRecipes />
            </ProtectedRoute>
          }
        />

        {/* Redirect if authenticated */}
        <Route
          path="/signIn"
          element={
            <RedirectIfAuthenticated>
              <SignInPage />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/signUp"
          element={
            <RedirectIfAuthenticated>
              <SignUpPage />
            </RedirectIfAuthenticated>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
