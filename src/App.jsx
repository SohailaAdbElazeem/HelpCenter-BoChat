import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
// import SpecialtiesAndSecurity from "./components/SpecialtiesAndSecurity/SpecialtiesAndSecurity";
// import SmartFeatures from "./components/SmartFeatures/SmartFeatures";
// import PersonalizeExp from "./components/PersonalizeExp/PersonalizeExp";
// import Quickstart from "./components/Quickstart/Quickstart";
// import AccountSettings from "./components/AccountSettings/AccountSettings";
// import Subscriptions from "./components/Subscriptions/Subscriptions";
// import FAQ from "./components/FAQ/FAQ";
import JoinUs from "./components/JoinUs/JoinUs";
import FormPage from "./components/FormPage/FormPage";
import NewAccount from "./components/NewAccount/NewAccount";
import Ambassadors from "./components/Ambassadors/Ambassadors";
import Invest from "./components/Invest/Invest";
import Developers from "./components/Developers/Developers";
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
			// { path: "specialtiesAndSecurity", element: <SpecialtiesAndSecurity /> },
			// { path: "smartFeatures", element: <SmartFeatures /> },
			// { path: "personalizeExp", element: <PersonalizeExp /> },
			// { path: "quickstart", element: <Quickstart /> },
			// { path: "accountSettings", element: <AccountSettings /> },
			// { path: "subscriptions", element: <Subscriptions /> },
			// { path: "FAQs", element: <FAQ /> },
			{ path: "joinUs", element: <JoinUs /> },
			{ path: "formpage", element: <FormPage /> },
			{ path: "Ambassadors", element: <Ambassadors/> },
			{ path: "Invest", element: <Invest/> },
			{ path: "Developers", element: <Developers/> },
			{ path: "newAccount", element: <NewAccount /> },
			{ path: "/article/:id", element: <ArticleDetails/> },
 			//  { path: "category/:ctg", element: <CategoryArticles/> },
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
