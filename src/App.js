import './App.css';
import { Box } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from 'react';
import { getStocks } from './APIs/getStocks';
import StockList from './components/StockList/StockList';
import TrackedStocks from './components/TrackedStocks/TrackedStocks';
import { theme } from './themes/theme';
import { getTrackedStocks } from './utils/getTrackedStocks';

function App() {
  const [stocks, setStocks] = useState();
  const [trackedStocks, setTrackedStocks] = useState();

  function refreshStocks() {
    getStocks().then((data) => {
      setStocks(data.data);
      getTrackedStocks(data.data).then((trackedStocks) => {
        setTrackedStocks(trackedStocks);
      });
    });
  }

  useEffect(() => {    
    refreshStocks();
    setInterval(() => {
      refreshStocks();
    }, 10000);
  }, []);

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Box padding='20px'>
          {
            stocks && <StockList
              stocks={stocks}
            />
          }
          <Box height='30px' />
          {
            trackedStocks && <TrackedStocks
              stocks={trackedStocks}
            />
          }
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
