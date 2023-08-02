import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../styled/Input';
import { Label } from '../styled/Label';
import { ModalProps } from './modal.props';
import {
	Centered,
	CloseButton,
	DarkBackground,
	Heading,
	ModalContent,
	ModalForm,
	ModalHeader,
	StyledModal,
} from './modal.style';
import privateApi from '../../api/privateApi';
import { API } from '../../helpers/api';
import { Button } from '../styled/Button';
import { RiCloseLine } from 'react-icons/ri';
import { ErrorSpan } from '../styled/ErrorSpan';

export interface IFormInput {
	name: string;
	description: string;
	price: number;
}

export const Modal = ({
	setIsOpen,
	defaultValues,
	data: products,
	setData,
	type,
}: ModalProps): JSX.Element => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormInput>({
		defaultValues: {
			name: defaultValues && type === 'change' ? defaultValues.name : '',
			description: defaultValues && type === 'change' ? defaultValues.description : '',
			price: defaultValues && type === 'change' ? Number(defaultValues.price) : undefined,
		},
	});

	const onSubmitCreate: SubmitHandler<IFormInput> = async (data) => {
		console.log('submit');
		try {
			const response = await privateApi.post(API.product.create, {
				name: data.name,
				description: data.description,
				price: Number(data.price),
			});
			const copyData = [...products];
			copyData.push(response.data);
			setData(copyData);
			setIsOpen(false);
		} catch (err) {
			console.log(err);
		}
	};

	const onSubmitChange: SubmitHandler<IFormInput> = async (data) => {
		try {
			const response = await privateApi.patch(API.product.update + defaultValues?.id.toString(), {
				name: data.name,
				description: data.description,
				price: Number(data.price),
			});
			const copyData = [...products];
			const index = copyData.findIndex((product) => product.id == defaultValues?.id);
			copyData[index] = response.data;
			setData(copyData);
			setIsOpen(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<DarkBackground>
			<Centered>
				<StyledModal>
					<ModalHeader>
						<Heading>Заполните поля</Heading>
					</ModalHeader>
					<CloseButton onClick={() => setIsOpen(false)}>
						<RiCloseLine />
					</CloseButton>
					<ModalContent>
						<ModalForm
							onSubmit={
								type === 'create' ? handleSubmit(onSubmitCreate) : handleSubmit(onSubmitChange)
							}
						>
							<Label>Название</Label>
							<Input
								{...register('name', { required: { value: true, message: 'Заполните название' } })}
							/>
							{errors.name?.type === 'required' && <ErrorSpan>{errors.name.message}</ErrorSpan>}
							<Label>Описание</Label>
							<Input
								{...register('description', {
									required: { value: true, message: 'Заполните описание' },
								})}
							/>
							{errors.description?.type === 'required' && (
								<ErrorSpan>{errors.description.message}</ErrorSpan>
							)}
							<Label>Цена</Label>
							<Input
								{...register('price', {
									required: { value: true, message: 'Заполните цену' },
									min: { value: 0, message: 'Цена должна быть больше нуля' },
									max: { value: 999, message: 'Цена должна быть меньше 999' },
									validate: (value) => value > 0 || 'Введите число',
								})}
							/>
							{errors.price?.type === 'required' && <ErrorSpan>{errors.price.message}</ErrorSpan>}
							{errors.price?.type === 'max' && <ErrorSpan>{errors.price.message}</ErrorSpan>}
							{errors.price?.type === 'min' && <ErrorSpan>{errors.price.message}</ErrorSpan>}
							<Button type="submit" style={{ width: 'auto' }}>
								Отправить
							</Button>
						</ModalForm>
					</ModalContent>
				</StyledModal>
			</Centered>
		</DarkBackground>
	);
};
