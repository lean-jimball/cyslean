import CySleanApp from './CySleanApp';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div style={{ overflowX:"hidden", maxWidth:"100vw", position:"relative" }}>
      <CySleanApp />
      <WhatsAppButton />
    </div>
  );
}

export default App;
