import { styled } from 'styled-components';

export const GridArea = styled.header`
	grid-area: header;
	display: grid;
	grid-template-columns: 20px auto 60px 20px;
	align-items: center;
	gap: 10px;
	background-color: #4a4c9e;
	height: 50px;
`;

export const Text = styled.div`
	font-weight: bold;
	font-size: 24px;
	color: white;
`;

export const Logout = styled.button`
	background-color: rgba(51, 51, 51, 0.05);
	border-radius: 5px;
	border-width: 0;
	color: #333333;
	background-color: #fafbfc;
	cursor: pointer;
	display: inline-block;
	font-size: 14px;
	font-weight: 500;
	line-height: 15px;
	list-style: none;
	margin: 0;
	padding: 10px 10px;
	text-align: center;
	transition: all 200ms;
	vertical-align: baseline;
	white-space: nowrap;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
`;
