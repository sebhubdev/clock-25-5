import './assets/css/App.css';
import Clock from './components/clock';
import Header from './components/header'
import Footer from './components/footer'


function App() {
  return (
    <div id="App">
      <Header/>
      <Clock/>
      <div id="credits">By Sebastian Neumann</div>
      <Footer/>
    </div>
  );
}

export default App;
