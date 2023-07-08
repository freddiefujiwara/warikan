import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders CalculationPage component', () => {
    const { getByLabelText } = render(<App />);

    const peopleOnYourSideInput = getByLabelText(/Number of people on your side:/i);
    const peopleOnOtherSideInput = getByLabelText(/Number of people on the other side:/i);
    const totalCostInput = getByLabelText(/Total cost:/i);
    const percentageInput = getByLabelText(/Percentage of the cost your side will cover:/i);

    expect(peopleOnYourSideInput).toBeInTheDocument();
    expect(peopleOnOtherSideInput).toBeInTheDocument();
    expect(totalCostInput).toBeInTheDocument();
    expect(percentageInput).toBeInTheDocument();
});
