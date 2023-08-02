import { NavLink } from 'react-router-dom';
import { GridArea, SidebarButton } from './sidebar.style';

export const Sidebar = (): JSX.Element => {
	return (
		<GridArea>
			<ul style={{ listStyleType: 'none' }}>
				<li>
					<NavLink to="/products">
						<SidebarButton>Продукты</SidebarButton>
					</NavLink>
				</li>
				<li>
					<SidebarButton>Главная</SidebarButton>
				</li>
				<li>
					<SidebarButton>Помощь</SidebarButton>
				</li>
				<li>
					<SidebarButton>Прочее</SidebarButton>
				</li>
			</ul>
		</GridArea>
	);
};
