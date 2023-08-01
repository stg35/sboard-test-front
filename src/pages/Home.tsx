import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/styled/Button';

export const HomePage = (): JSX.Element => {
	const { logout } = useAuth();
	return <Button onClick={() => logout()}>logout</Button>;
};
