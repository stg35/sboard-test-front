import { styled } from 'styled-components';

export const StyledTable = styled.table`
	border-collapse: separate;
	border-spacing: 0;
	text-align: center;
	vertical-align: middle;

	caption {
		font-weight: bold;
		font-size: 24px;
		text-align: left;
		color: #333;
		margin-bottom: 16px;
	}

	thead th {
		width: 25%;
	}

	th,
	td {
		border: 1px solid black;
		padding: 8px;
	}

	thead {
		background-color: #4a4c9e;
		color: white;
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 2%;
	}

	tbody tr:nth-child(odd) {
		background-color: #fff;
	}

	tbody tr:nth-child(even) {
		background-color: #eee;
	}

	tr:first-child th:first-child {
		border-top-left-radius: 10px;
	}

	tr:first-child th:last-child {
		border-top-right-radius: 10px;
	}

	tr:last-child td:first-child {
		border-bottom-left-radius: 10px;
	}

	tr:last-child td:last-child {
		border-bottom-right-radius: 10px;
	}
`;
