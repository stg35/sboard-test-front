import { styled } from 'styled-components';

export const GridArea = styled.div`
	grid-area: sidebar;
`;

export const SidebarButton = styled.div`
	height: 40px;
	width: 120px;
	border-radius: 10px;
	text-align: center;
	padding: 10px;
	cursor: pointer;
	transition: all 200ms;
	margin-bottom: 10px;

	a.active & {
		background-color: rgba(220, 220, 220, 0.8);
	}

	&:hover {
		background-color: rgba(220, 220, 220, 0.8);
	}
`;
