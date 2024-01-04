import { Header } from "./components/Header";
import { Pages } from "./components/Pages";
import { Contact } from "./components/Pages/Contact";
import { Preview } from "./components/Preview";
import { CanvasWrapper } from "./components/CanvasWrapper";

function App() {
  return (
    <>
      <Header />
      <Pages />
      <Contact />
      <Preview />
      <CanvasWrapper />
    </>
  );
}

export default App;
