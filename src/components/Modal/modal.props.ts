import { Product } from '../../interfaces/product.interface';

export interface ModalProps {
	data: Product[];
	setIsOpen: (isOpen: boolean) => void;
	setData: (data: Product[]) => void;
	type: 'change' | 'create';
	defaultValues?: Product;
}
