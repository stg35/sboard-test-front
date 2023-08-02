import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { API } from '../../helpers/api';
import { Card } from '../../components/styled/Card';
import { AuthForm, AuthWrapper } from './auth.style';
import { Input } from '../../components/styled/Input';
import { Button } from '../../components/styled/Button';
import { Label } from '../../components/styled/Label';
import { ErrorSpan } from '../../components/styled/ErrorSpan';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Tokens } from '../../hooks/useTokens';

interface IFormInput {
	login: string;
	password: string;
}

enum Exceptions {
	BadRequest = 400,
	ServerError = 500,
}

export const RegisterPage = (): JSX.Element => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormInput>();
	const { login } = useAuth();
	const [error, setError] = useState<Exceptions>();
	const navigate = useNavigate();
	const onSubmit: SubmitHandler<IFormInput> = async (credentials) => {
		try {
			const response = await axios.post(API.auth.register, credentials);
			const tokens: Tokens = response.data;

			login(tokens);

			navigate('/products');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === Exceptions.BadRequest) {
					setError(Exceptions.BadRequest);
				} else if (error.response?.status === Exceptions.ServerError) {
					setError(Exceptions.ServerError);
				}
				console.log(error.response?.status);
			} else {
				console.log(error);
			}
		}
	};

	return (
		<AuthWrapper>
			<Card>
				<AuthForm onSubmit={handleSubmit(onSubmit)}>
					<Label>Логин</Label>
					<Input
						type="email"
						{...register('login', { required: { value: true, message: 'Заполните логин' } })}
						aria-invalid={errors.login ? 'true' : 'false'}
					/>
					{errors.login?.type === 'required' && <ErrorSpan>{errors.login.message}</ErrorSpan>}
					{error === Exceptions.BadRequest && <ErrorSpan>Логин занят</ErrorSpan>}
					<Label>Пароль</Label>
					<Input
						type="password"
						{...register('password', { required: { value: true, message: 'Заполните пароль' } })}
						aria-invalid={errors.password ? 'true' : 'false'}
					/>
					{errors.password?.type === 'required' && <ErrorSpan>{errors.password.message}</ErrorSpan>}
					<Button type="submit" style={{ width: 'auto' }}>
						Зарегистрироваться
					</Button>
					{error === Exceptions.ServerError && (
						<ErrorSpan style={{ marginTop: '0px' }}>Проблема с подключением</ErrorSpan>
					)}
				</AuthForm>
			</Card>
		</AuthWrapper>
	);
};
