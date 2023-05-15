const form = document.getElementById("calculator");

document.getElementsByName("homePrice")[0].addEventListener('change', updateLoanAmount);
document.getElementsByName("downPayment")[0].addEventListener('change', updateLoanAmount);

/* Functions */
function homePriceValue() {
    const homePrice1 = parseFloat(document.getElementById("homePrice").value);
    return homePrice1 || 0;
}

function downPaymentValue() {
    const dp = parseFloat(document.getElementById("downPayment").value);
    return dp || 0;
}

function updateLoanAmount() {
    const homePrice = homePriceValue();
    const downPayment = downPaymentValue();
    document.getElementById("loanAmount").value = homePrice - downPayment;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const homePrice = homePriceValue();
    const downPayment = downPaymentValue();
    const loanAmount = homePrice - downPayment;
    const interestRate = parseFloat(document.getElementById("interestRate").value);
    const propertyTax = parseFloat(document.getElementById("propertyTax").value);
    const homeInsurance = parseFloat(document.getElementById("homeInsurance").value);
    const fundingFee = parseFloat(document.getElementById("fundingFee").value);
    const loanTerm = parseFloat(document.getElementById("loanTerm").value);
    const monthlyInterestRate = interestRate / (12 * 100);
    const loanTermInMonths = loanTerm * 12;
    const FundingFee$ = fundingFee ? (fundingFee / 100) * loanAmount : 0;
    console.log(FundingFee$)
    const monthlyPayment = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermInMonths)) / (Math.pow(1 + monthlyInterestRate, loanTermInMonths) - 1);
    const actualMonthlyPayment = monthlyPayment + (propertyTax / 12) + (homeInsurance / 12) + (FundingFee$ / loanTermInMonths);
    const totalMoneySpend = actualMonthlyPayment * loanTermInMonths;

    localStorage.setItem("homePrice", homePrice || '');
    localStorage.setItem("downPayment", downPayment || '');
    localStorage.setItem("loanAmount", loanAmount || '');
    localStorage.setItem("interestRate", interestRate || '');
    localStorage.setItem("propertyTax", propertyTax || '');
    localStorage.setItem("homeInsurance", homeInsurance || '');
    localStorage.setItem("fundingFee", fundingFee || '');
    localStorage.setItem("loanTerm", loanTerm || '');

    const results = document.getElementById("results");
    results.innerHTML = `
        <table>
            <tr>
                <th>Home Price</th>
                <td>$${homePrice.toFixed(2) || 0}</td>
            </tr>
            <tr>
                <th>Down Payment</th>
                <td>$${downPayment.toFixed(2) || 0}</td>
            </tr>
            <tr>
                <th>Loan Amount</th>
                <td>$${(Number(FundingFee$)+Number(loanAmount.toFixed(2))) || 0} ${FundingFee$ > 0 ? '*** VA Funding Fee is added***' : ''}</td>
            </tr>
            ${FundingFee$ > 0 ? `<tr>
            <th>VA Funding Fee</th>
            <td>$${(FundingFee$.toFixed(2))}</td>
        </tr>` : ''}
            <tr>
                <th>Monthly Payment</th>
                <td>$${actualMonthlyPayment ? actualMonthlyPayment.toFixed(2) : 0.00}</td>
            </tr>
            <tr>
                <th>Total Money Spent</th>
                <td>$${totalMoneySpend ? totalMoneySpend.toFixed(2) : 0.00}</td>
            </tr>
        </table>`;
});

function getFromLocalStorage() {
    document.getElementById("homePrice").value = localStorage.getItem("homePrice") || '';
    document.getElementById("downPayment").value = localStorage.getItem("downPayment") || '';
    document.getElementById("loanAmount").value = localStorage.getItem("loanAmount") || '';
    document.getElementById("interestRate").value = localStorage.getItem("interestRate") || '';
    document.getElementById("propertyTax").value = localStorage.getItem("propertyTax") || '';
    document.getElementById("homeInsurance").value = localStorage.getItem("homeInsurance") || '';
    document.getElementById("fundingFee").value = localStorage.getItem("fundingFee") || '';
    document.getElementById("loanTerm").value = localStorage.getItem("loanTerm") || '';
}

getFromLocalStorage();

// Function for reset button
const resetButton = document.getElementById("resetButton");

resetButton.addEventListener('click', () => {
    form.reset();

    // Clear the results div
    const results = document.getElementById("results");
    results.innerHTML = "";

    // Clear local storage
    localStorage.removeItem("homePrice");
    localStorage.removeItem("downPayment");
    localStorage.removeItem("loanAmount");
    localStorage.removeItem("interestRate");
    localStorage.removeItem("propertyTax");
    localStorage.removeItem("homeInsurance");
    localStorage.removeItem("fundingFee");
    localStorage.removeItem("loanTerm");
});
    
