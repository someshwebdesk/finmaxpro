// ===== FinMaxPro EMI Calculator Script =====

document.getElementById("calculateBtn").addEventListener("click", function () {
  const amount = parseFloat(document.getElementById("loanAmount").value);
  const annualRate = parseFloat(document.getElementById("interestRate").value);
  const years = parseFloat(document.getElementById("loanTenure").value);

  if (isNaN(amount) || isNaN(annualRate) || isNaN(years)) {
    alert("Please enter all fields correctly.");
    return;
  }

  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  const emi =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - amount;

  document.getElementById("emiResult").textContent = emi.toFixed(2);
  document.getElementById("totalInterest").textContent = totalInterest.toFixed(2);
  document.getElementById("totalPayment").textContent = totalPayment.toFixed(2);

  renderChart(amount, totalInterest);
});

// Pie Chart
let emiChart;
function renderChart(principal, interest) {
  const ctx = document.getElementById("emiChart").getContext("2d");
  if (emiChart) emiChart.destroy();
  emiChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Principal", "Interest"],
      datasets: [
        {
          data: [principal, interest],
          backgroundColor: ["#0073e6", "#00c49f"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
}
