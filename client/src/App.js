import "./App.css";
import EditableTable from "./components/EditableTable";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Landing from "./routes/Landing";

function App() {
  return (
    <div className="App">
      <Header />
      <Landing />
      <Footer />
    </div>
  );
}

export default App;
