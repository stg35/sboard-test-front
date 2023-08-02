import { styled } from 'styled-components';

export const DarkBackground = styled.div`
	background-color: rgba(0, 0, 0, 0.2);
	width: 100vw;
	height: 100vh;
	z-index: 0;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	position: absolute;
`;

export const Centered = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const StyledModal = styled.div`
	width: 250px;
	background: white;
	color: white;
	z-index: 10;
	border-radius: 16px;
	box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
`;

export const ModalHeader = styled.div`
	height: 35px;
	background: white;
	overflow: hidden;
	border-top-left-radius: 16px;
	border-top-right-radius: 16px;
`;

export const Heading = styled.h5`
	margin: 0;
	padding: 10px;
	color: #2c3e50;
	font-weight: 500;
	font-size: 18px;
	text-align: center;
`;

export const ModalContent = styled.div`
	padding: 10px;
	font-size: 14px;
	color: #2c3e50;
`;

export const ModalForm = styled.form`
	display: flex;
	flex-direction: column;
`;

export const CloseButton = styled.button`
	cursor: pointer;
	font-weight: 500;
	padding: 11px;
	border-radius: 16px;
	border: none;
	font-size: 18px;
	color: #2c3e50;
	background: white;
	position: absolute;
	right: 0;
	top: 0;
	align-self: flex-end;
`;
