
import { Container } from 'react-bootstrap';
import './App.css';
import AppNavBar from './components/AppNavbar'
import Home from './pages/Home';



function App() {
  return (
    <>
      <AppNavBar />
      <Container>
      <Home />
      </Container>
    </>
  );
}

export default App;
