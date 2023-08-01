import { Outlet } from 'react-router';
import { Footer } from './Footer/Footer';
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
		<Footer></Footer>
	</Wrapper>
);
