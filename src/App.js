import './App.scss';
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import RecipeList from "./components/RecipeList";
import { useState } from 'react';

function App() {

  const [loader, setLoader] = useState(true)

  return (
    <div className="App">
      <Header />
      <Tabs setLoader={setLoader}/>
      <RecipeList setLoader={setLoader} />
      {loader && <div className='loader'>
        <div className='spinner'></div>
      </div>}
    </div>
  );
}

export default App;



// https://loquacious-meerkat-c4343c.netlify.app/