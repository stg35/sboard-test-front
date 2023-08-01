import { useEffect, useState } from 'react';
import { API } from '../helpers/api';
import { Product } from '../interfaces/product.interface';
import { useAuth } from '../hooks/useAuth';

import { useNavigate } from 'react-router';
import privateApi from '../api/privateApi';

export const ProductsPage = (): JSX.Element => {
	const [products, setProducts] = useState<Product[]>([]);
	const { tokens } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const { data: products } = await privateApi.get(API.product.getAll);
				setProducts(products);
			} catch (err) {
				console.log(err);
				navigate('/auth/login');
			}
		})();
	}, []);

	return (
		<div>
			{products.map((product) => (
				<div>{product.name}</div>
			))}
			{tokens?.accessToken}
		</div>
	);
};
