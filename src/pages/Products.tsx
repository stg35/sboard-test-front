import { useEffect, useState } from 'react';
import { API } from '../helpers/api';
import { Product } from '../interfaces/product.interface';
import { useNavigate } from 'react-router';
import privateApi from '../api/privateApi';
import { CellContext, createColumnHelper } from '@tanstack/react-table';
import { Table } from '../components/Table/Table';
import { Button } from '../components/styled/Button';
import { Modal } from '../components/Modal/Modal';
import { HeadText } from '../components/styled/HeadText';

export const ProductsPage = (): JSX.Element => {
	const [products, setProducts] = useState<Product[]>([]);
	const [rowValue, setRowValue] = useState<Product | undefined>(undefined);
	const [modalType, setModalType] = useState<'change' | 'create'>('create');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

	const deleteRow = async (props: CellContext<Product, unknown>): Promise<void> => {
		const dataCopy = [...products];
		const deletedProduct = dataCopy.splice(props.row.index, 1);
		try {
			await privateApi.delete(API.product.delete + deletedProduct[0].id.toString());
			setProducts(dataCopy);
		} catch (err) {
			console.log(err);
		}
	};

	const setIsOpen = (newIsOpen: boolean): void => {
		setIsModalOpen(newIsOpen);
	};

	const openChangeModalToChange = (props: CellContext<Product, unknown>): void => {
		setRowValue(props.row.original);
		setModalType('change');
		setIsModalOpen(true);
	};

	const openChangeModalToCreate = (): void => {
		setRowValue(undefined);
		setModalType('create');
		setIsModalOpen(true);
	};

	const columnHelper = createColumnHelper<Product>();

	const columns = [
		columnHelper.accessor('id', {
			header: 'ID',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('name', {
			header: 'Название',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('description', {
			header: 'Описание',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('price', {
			header: 'Цена',
			cell: (info) => info.getValue(),
		}),
		columnHelper.display({
			id: 'actions',
			header: 'Действия',
			cell: (props) => (
				<div style={{ display: 'flex', gap: '10px' }}>
					<Button onClick={() => openChangeModalToChange(props)}>Изменить</Button>
					<Button onClick={() => deleteRow(props)}>Удалить</Button>
				</div>
			),
		}),
	];

	const setData = (newData: Product[]): void => {
		setProducts(newData);
	};

	return (
		<div>
			<HeadText>Продукты</HeadText>
			<Button onClick={() => openChangeModalToCreate()}>Добавить</Button>
			<Table data={products} setData={setData} columns={columns}></Table>
			{isModalOpen && (
				<Modal
					setIsOpen={setIsOpen}
					defaultValues={rowValue}
					data={products}
					setData={setData}
					type={modalType}
				/>
			)}
		</div>
	);
};
