import { styled } from 'styled-components';

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: auto 230px minmax(320px, 1200px) auto;
	grid-template-rows: auto 1fr auto;
	min-height: 100vh;
	gap: 40px 30px;
	grid-template-areas:
		'header header header header'
		'. sidebar body .';
`;

export const BodyGridArea = styled.div`
	grid-area: body;
`;
