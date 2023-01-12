import { useState } from "react";
import {BrowserRouter,Route,Routes,Link} from "react-router-dom"
import { Gameboard } from './components/connectfour';
import { Homepage } from "./components/homepage";
import { ProjectsPage } from "./components/projects";
import { Chesspage } from "./components/chess/chess";
import { Whiteboard } from "./components/whiteboard/App";
import {Contact} from "./components/contact";

function App() {
  var [isLoading,updateLoadState] = useState((true))

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element ={<Homepage/>}></Route>
      <Route path="/projects" element={<ProjectsPage/>}></Route>
      <Route path="/contact" element={<Contact/>}> </Route>
      <Route path="/projects/connect4" element={<Gameboard/>}></Route>
      <Route path="/projects/chess" element={<Chesspage/>}></Route>
      <Route path="/projects/whiteboard" element={<Whiteboard/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}



export default App;
