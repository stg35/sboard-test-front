import { styled } from 'styled-components';

export const Button = styled.button`
	display: inline-block;

	box-sizing: border-box;
	padding: 10px;

	cursor: pointer;
	text-align: center;
	border: none;
	border-radius: 5px;

	font-size: 14px;
	transition: all 0.2;

	color: #fff;
	background-color: #7653fc;

	&:hover {
		background-color: #6344df;
	}

	margin-bottom: 10px;
`;
