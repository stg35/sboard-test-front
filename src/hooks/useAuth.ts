import { useContext, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Tokens, useTokens } from './useTokens';
import { AuthContext } from '../context/auth.context';

export const useAuth = () => {
	const { tokens, addTokens, removeTokens } = useTokens();
	const { getItem } = useLocalStorage();
	const { loading } = useContext(AuthContext);

	useEffect(() => {
		const accessToken = getItem('accessToken');
		const refreshToken = getItem('refreshToken');
		if (!accessToken && !refreshToken) {
			removeTokens();
		}
	}, []);

	const login = (tokens: Tokens): void => {
		addTokens(tokens);
	};

	const logout = (): void => {
		removeTokens();
	};

	return { tokens, login, logout, loading };
};
