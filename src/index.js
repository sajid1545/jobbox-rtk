import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Toaster
				toastOptions={{
					className: '',
					style: {
						padding: '16px',
						background: '#000000',
						color: 'white',
					},
				}}
			/>
			<App />
		</Provider>
	</React.StrictMode>
);
