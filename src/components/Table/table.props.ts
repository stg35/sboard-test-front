import { ColumnDef } from '@tanstack/react-table';
import { Product } from '../../interfaces/product.interface';

export interface TableProps {
	data: Product[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	columns: ColumnDef<Product, any>[];
	setData: (data: Product[]) => void;
}
