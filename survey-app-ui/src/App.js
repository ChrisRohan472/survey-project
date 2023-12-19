import React from 'react';
import MyForm from './Form/FormMUI.jsx';
import SurveyList from './SurveyList/SurveyList.jsx';
import LoginPage from './Login/Login.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div><MyForm/></div>,
  },
  {
    path: "/login",
    element: <div><LoginPage/></div>,
  },
  {
    path: "/surveylist",
    element: <div><SurveyList/></div>,
  },
]);

function App() {
  return (
    <div>
         <RouterProvider router={router} />
    </div>
  );
}

export default App;
