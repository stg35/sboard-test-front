import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { ProductsPage } from './pages/Products';
import { LoginPage } from './pages/Auth/Login';
import { RegisterPage } from './pages/Auth/Register';
import { AuthProvider } from './context/auth.context';
import { ProtectRoutes } from './pages/Auth/ProtectRoute';

function App(): JSX.Element {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route element={<ProtectRoutes />}>
							<Route index element={<ProductsPage />}></Route>
							<Route path="/products" element={<ProductsPage />}></Route>
						</Route>
					</Route>
					<Route index path="/auth/login" element={<LoginPage />}></Route>
					<Route path="/auth/register" element={<RegisterPage />}></Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
