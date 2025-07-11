import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {store} from "./redux/store/store.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={{client}}>


        <App />
        <ReactQueryDevtools initialIsOpen = {false} />
      </QueryClientProvider>
    </Provider>
    <App />
  </StrictMode>,
)
