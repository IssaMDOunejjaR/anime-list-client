import { useState, useEffect } from 'react';

export const useDebounce = (fieldValue: string, delay: number) => {
	const [value, setValue] = useState('');

	useEffect(() => {
		const timer = setTimeout(() => {
			setValue(fieldValue);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [fieldValue, delay]);

	return value;
};
