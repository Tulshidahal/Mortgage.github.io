const form = document.getElementById("calculator");
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const homePrice = parseFloat(document.getElementById("homePrice").value);
  const downPayment = parseFloat(document.getElementById("downPayment").value);
  const loanAmount = homePrice - downPayment;
  const interestRate = parseFloat(document.getElementById("interestRate").value);
  const propertyTax = parseFloat(document.getElementById("propertyTax").value);
  const homeInsurance = parseFloat(document.getElementById("homeInsurance").value);
  const fundingFee = parseFloat(document.getElementById("fundingFee").value);
  const monthlyInterestRate = interestRate / (12 * 100);
  const loanTermInMonths = 30 * 12;
  
  const monthlyPayment = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermInMonths)) / (Math.pow(1 + monthlyInterestRate, loanTermInMonths) - 1);
  const totalMoneySpend = monthlyPayment * loanTermInMonths;
  console.log(monthlyPayment);

  localStorage.setItem("homePrice", homePrice);
  localStorage.setItem("downpayment", downPayment);
  localStorage.setItem("loanamount", loanAmount);
  localStorage.setItem("interestrate", interestRate);
  localStorage.setItem("propertytax", propertyTax);
  localStorage.setItem("homeinsurance", homeInsurance);
  localStorage.setItem("fundingfee", fundingFee);
  
  const results = document.getElementById("results");
  results.innerHTML = `
    <p>Home Price: $${homePrice}</p>
    <p>Down Payment: $${downPayment}</p>
    <p>Loan Amount: $${loanAmount}</p>
    <p>Monthly Payment: $${monthlyPayment.toFixed(2)}</p>
    <p> You will spend total of $${totalMoneySpend.toFixed(2)} throughout the loan life. </p>
  `;
});
