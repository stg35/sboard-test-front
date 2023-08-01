import { useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { AuthContext } from '../context/auth.context';

export interface Tokens {
	accessToken: string;
	refreshToken: string;
}

export const useTokens = () => {
	const { tokens, setTokens } = useContext(AuthContext);
	const { setItem, removeItem } = useLocalStorage();

	const addTokens = (tokens: Tokens): void => {
		setTokens(tokens);
		setItem('accessToken', tokens.accessToken);
		setItem('refreshToken', tokens.refreshToken);
	};

	const removeTokens = (): void => {
		setTokens(null);
		removeItem('accessToken');
		removeItem('refreshToken');
	};

	return { tokens, addTokens, removeTokens };
};
