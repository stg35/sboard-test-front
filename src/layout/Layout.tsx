import { Outlet } from 'react-router';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { BodyGridArea, Wrapper } from './layout.style';

export const Layout = (): JSX.Element => (
	<Wrapper>
		<Header></Header>
		<Sidebar></Sidebar>
		<BodyGridArea>
			<Outlet />
		</BodyGridArea>
	</Wrapper>
);
