import { createContext, useState } from 'react';
import { Tokens } from '../hooks/useTokens';
import { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AuthContext {
	tokens: Tokens | null;
	setTokens: (user: Tokens | null) => void;
	loading: boolean;
}

export const AuthContext = createContext<AuthContext>({
	tokens: null,
	setTokens: () => {},
	loading: true,
});

export const AuthProvider = ({ children }): JSX.Element => {
	const [tokensState, setTokensState] = useState<Tokens | null>(null);
	const [loading, setLoading] = useState(true);
	const { getItem } = useLocalStorage();

	useEffect(() => {
		const accessToken = getItem('accessToken');
		const refreshToken = getItem('refreshToken');
		if (accessToken && refreshToken) {
			setTokensState({ accessToken, refreshToken });
		}
		setLoading(false);
	}, []);

	return (
		<AuthContext.Provider value={{ tokens: tokensState, setTokens: setTokensState, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
