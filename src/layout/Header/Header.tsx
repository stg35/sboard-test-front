import { useAuth } from '../../hooks/useAuth';
import { GridArea, Logout, Text } from './header.style';

export const Header = (): JSX.Element => {
	const { logout } = useAuth();
	return (
		<GridArea>
			<div></div>
			<Text>Test</Text>
			<Logout onClick={() => logout()}>Выйти</Logout>
			<div></div>
		</GridArea>
	);
};
