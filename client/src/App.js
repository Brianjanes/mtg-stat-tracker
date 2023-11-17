import "./App.css";
import EditableTable from "./components/EditableTable";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <EditableTable />
      <Footer />
    </div>
  );
}

export default App;
