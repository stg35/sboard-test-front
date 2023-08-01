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
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface IFormInput {
	login: string;
	password: string;
}

enum Exceptions {
	Unauthorized = 401,
	ServerError = 500,
}

export const LoginPage = (): JSX.Element => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormInput>();
	const { login, tokens } = useAuth();
	const [error, setError] = useState<Exceptions>();
	const navigate = useNavigate();
	useEffect(() => {
		console.log(tokens);
	});
	const onSubmit: SubmitHandler<IFormInput> = async (credentials) => {
		try {
			const response = await axios.post(API.auth.login, credentials);
			const tokens = response.data;

			login(tokens);

			navigate('/products');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === Exceptions.Unauthorized) {
					setError(Exceptions.Unauthorized);
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
					<Label>Пароль</Label>
					<Input
						type="password"
						{...register('password', { required: { value: true, message: 'Заполните пароль' } })}
						aria-invalid={errors.password ? 'true' : 'false'}
					/>
					{errors.password?.type === 'required' && <ErrorSpan>{errors.password.message}</ErrorSpan>}
					<Button type="submit">Войти</Button>
					{error === Exceptions.ServerError && (
						<ErrorSpan style={{ marginTop: '0px' }}>Проблема с подключением</ErrorSpan>
					)}
					{error === Exceptions.Unauthorized && (
						<ErrorSpan style={{ marginTop: '0px' }}>Неверный пароль или логин</ErrorSpan>
					)}
					<p style={{ textAlign: 'center' }}>
						<Link to="/auth/register">Зарегестрироваться</Link>
					</p>
				</AuthForm>
			</Card>
		</AuthWrapper>
	);
};
