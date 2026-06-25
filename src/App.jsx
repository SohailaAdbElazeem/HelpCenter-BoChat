import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import FAQ from "./components/FAQ/FAQ";
import JoinUs from "./components/JoinUs/JoinUs";
import FormPage from "./components/FormPage/FormPage";
import NewAccount from "./components/NewAccount/NewAccount";
 
import { SearchProvider } from "./Context/SearchContext";
import ArticleDetails from "./components/ArticleDetails/ArticleDetails";
import ArticlesByCategory from "./components/ArticlesByCategory/ArticlesByCategory";
 const Router = createBrowserRouter([
	{
		path: "",
		element: <Layout />,
		children: [
			{ path: "", element: <Home /> },
			{ path: "Home", element: <Home /> },
		 
			{ path: "FAQs", element: <FAQ /> },
			{ path: "joinUs", element: <JoinUs /> },
			{ path: "formpage", element: <FormPage /> },
			 
			{ path: "newAccount", element: <NewAccount /> },
			{ path: "/article/:id", element: <ArticleDetails/> },
 			{path:"/category/:ctg", element:<ArticlesByCategory/>}


		],
	},
]);
function App() {
	return (
		<SearchProvider>

			<div className="App">
				<RouterProvider router={Router}></RouterProvider>
			</div>
		</SearchProvider>
 	);
}

export default App;
