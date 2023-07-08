import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CalculationPage from './CalculationPage';

test('renders form and performs calculation', async () => {
    const { getByLabelText, getByText } = render(<CalculationPage />);

    const peopleOnYourSideInput = getByLabelText(/Number of people on your side:/i);
    const peopleOnOtherSideInput = getByLabelText(/Number of people on the other side:/i);
    const totalCostInput = getByLabelText(/Total cost:/i);
    const percentageInput = getByLabelText(/Percentage of the cost your side will cover:/i);

    fireEvent.change(peopleOnYourSideInput, { target: { value: '2' } });
    fireEvent.change(peopleOnOtherSideInput, { target: { value: '2' } });
    fireEvent.change(totalCostInput, { target: { value: '200' } });
    fireEvent.change(percentageInput, { target: { value: '50' } });

    fireEvent.click(getByText(/Calculate/i));

    await waitFor(() => {
        expect(getByText(/Your side total: 100/i)).toBeInTheDocument();
        expect(getByText(/Other side total: 0/i)).toBeInTheDocument();
        expect(getByText(/Change: 0/i)).toBeInTheDocument();
    });
});
