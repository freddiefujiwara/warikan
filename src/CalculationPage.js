import React from 'react';

class CalculationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            peopleOnYourSide: 1,
            peopleOnOtherSide: 1,
            totalCost: 1,
            percentage: 1,
            results: [],
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.calculate = this.calculate.bind(this);
        this.saveResult = this.saveResult.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    calculate(event) {
        event.preventDefault();
        const totalCost = parseInt(this.state.totalCost);
        const percentage = parseInt(this.state.percentage) / 100;
        const peopleOnYourSide = parseInt(this.state.peopleOnYourSide);
        const peopleOnOtherSide = parseInt(this.state.peopleOnOtherSide);

        const yourSideTotal = Math.ceil((totalCost * percentage) / peopleOnYourSide / 100) * 100;
        const otherSideTotal = Math.ceil((totalCost - yourSideTotal * peopleOnYourSide) / peopleOnOtherSide / 100) * 100;
        const change = (yourSideTotal * peopleOnYourSide + otherSideTotal * peopleOnOtherSide) - totalCost;

        this.setState({
            results: [...this.state.results, { yourSideTotal, otherSideTotal, change }]
        });
    }

    saveResult() {
        // Here you can implement the logic for saving the result, for example, to a server or to local storage
    }

    render() {
        return (
            <div>
                <form onSubmit={this.calculate}>
                    <label>
                        Number of people on your side:
                        <input type="number" min="1" max="99" name="peopleOnYourSide" value={this.state.peopleOnYourSide} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Number of people on the other side:
                        <input type="number" min="1" max="99" name="peopleOnOtherSide" value={this.state.peopleOnOtherSide} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Total cost:
                        <input type="number" min="1" max="999999" name="totalCost" value={this.state.totalCost} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Percentage of the cost your side will cover:
                        <input type="number" min="1" max="99" name="percentage" value={this.state.percentage} onChange={this.handleInputChange} />
                    </label>
                    <input type="submit" value="Calculate" />
                </form>
                <button onClick={this.saveResult}>Save Result</button>
                <div>
                    {this.state.results.map((result, index) => (
                        <div key={index}>
                            <p>Your side total: {result.yourSideTotal}</p>
                            <p>Other side total: {result.otherSideTotal}</p>
                            <p>Change: {result.change}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default CalculationPage;