const form = document.getElementById("calculator");
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const homePrice = parseFloat(document.getElementById("homePrice").value);
  const downPayment = parseFloat(document.getElementById("downPayment").value);
  const loanAmount = homePrice - downPayment;
  document.getElementById("loanAmount").value = loanAmount
  const interestRate = parseFloat(document.getElementById("interestRate").value);
  const propertyTax = parseFloat(document.getElementById("propertyTax").value);
  const homeInsurance = parseFloat(document.getElementById("homeInsurance").value);
  const fundingFee = parseFloat(document.getElementById("fundingFee").value);
  const loanTerm = parseFloat(document.getElementById("loanTerm").value);
  const monthlyInterestRate = interestRate / (12 * 100);
  const loanTermInMonths = loanTerm * 12;
  const FundingFee$ = (fundingFee / 100) * loanAmount
  const monthlyPayment = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermInMonths)) / (Math.pow(1 + monthlyInterestRate, loanTermInMonths) - 1);
  const actualMonthlyPayment = monthlyPayment + (propertyTax / 12) + (homeInsurance / 12 ) + (FundingFee$ / loanTermInMonths );
  //const monthlyPayment = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermInMonths)) / (Math.pow(1 + monthlyInterestRate, loanTermInMonths) - 1) +(( propertyTax + homeInsurance) / 12);
  const totalMoneySpend = monthlyPayment * loanTermInMonths;
  console.log(actualMonthlyPayment);

  localStorage.setItem("homePrice", homePrice);
  localStorage.setItem("downpayment", downPayment);
  localStorage.setItem("loanamount", loanAmount);
  localStorage.setItem("interestrate", interestRate);
  localStorage.setItem("propertytax", propertyTax);
  localStorage.setItem("homeinsurance", homeInsurance);
  localStorage.setItem("fundingfee", fundingFee);
  localStorage.setItem("loanTerm", loanTerm);
  
  const results = document.getElementById("results");
  results.innerHTML = `
    <p>Home Price: $${homePrice}</p>
    <p>Down Payment: $${downPayment}</p>
    <p>Loan Amount: $${loanAmount}</p>
    <p>Monthly Payment: $${actualMonthlyPayment.toFixed(2)}</p>
    <p>You will spend a total of $${totalMoneySpend.toFixed(2)} throughout the loan term.</p>`;
});
