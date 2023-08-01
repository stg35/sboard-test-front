import { ProductsProps } from './products.props';

export const Products = ({ products }: ProductsProps): JSX.Element => {
	return (
		<div>
			{products.map((product) => (
				<h3 key={product.id}>{product.name}</h3>
			))}
		</div>
	);
};
