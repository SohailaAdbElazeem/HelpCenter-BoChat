 import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import SpecialtiesAndSecurity from './components/SpecialtiesAndSecurity/SpecialtiesAndSecurity';
import SmartFeatures from './components/SmartFeatures/SmartFeatures';
import PersonalizeExp from './components/PersonalizeExp/PersonalizeExp';
import Quickstart from './components/Quickstart/Quickstart';
import AccountSettings from './components/AccountSettings/AccountSettings';
import Subscriptions from './components/Subscriptions/Subscriptions';
import FAQ from './components/FAQ/FAQ';
import JoinUs from './components/JoinUs/JoinUs';
import FormPage from './components/FormPage/FormPage';
const Router=createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {path:'',element:<Home/>},
      {path:'Home',element:<Home/>},
      {path:'specialtiesAndSecurity',element:<SpecialtiesAndSecurity/>},
      {path:'smartFeatures',element:<SmartFeatures/>},
      {path:'personalizeExp',element:<PersonalizeExp/>},
      {path:'quickstart',element:<Quickstart/>},
      {path:'accountSettings',element:<AccountSettings/>},
      {path:'subscriptions',element:<Subscriptions/>},
      {path:'faq',element:<FAQ/>},
      {path:'joinUs',element:<JoinUs/>},
      {path:'formpage',element:<FormPage/>},
    ]}
])
function App() {
  return (
    <div className="App">
        <RouterProvider router={Router}></RouterProvider>
    </div>
  );
}

export default App;
