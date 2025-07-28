function reduceSize() {
  const input = document.getElementById('reduceInput').files[0];
  const sizeInput = document.getElementById('sizeInput').value;
  if (!input || !sizeInput) return alert('Select an image and size.');
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      let quality = 0.9;
      const targetSize = sizeInput * 1024;
      let dataUrl = canvas.toDataURL('image/jpeg', quality);
      while (dataUrl.length > targetSize && quality > 0.1) {
        quality -= 0.05;
        dataUrl = canvas.toDataURL('image/jpeg', quality);
      }
      const link = document.getElementById('reduceLink');
      link.href = dataUrl;
      link.download = 'reduced.jpg';
      link.style.display = 'block';
      link.click();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(input);
}

function adjustDimensions() {
  const input = document.getElementById('adjustInput').files[0];
  const newHeight = parseInt(document.getElementById('newHeight').value);
  const newWidth = parseInt(document.getElementById('newWidth').value);
  if (!input || !newHeight || !newWidth) return alert('Fill all fields.');
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      const link = document.getElementById('adjustLink');
      link.href = canvas.toDataURL('image/jpeg');
      link.download = 'adjusted.jpg';
      link.style.display = 'block';
      link.click();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(input);
}

function convertImage() {
  const input = document.getElementById('convertInput').files[0];
  const format = document.getElementById('convertFormat').value;
  if (!input) return alert('Select an image.');
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = async function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      let dataUrl;
      if (format === 'pdf') {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 10, 10);
        const blob = pdf.output('blob');
        const url = URL.createObjectURL(blob);
        const link = document.getElementById('convertLink');
        link.href = url;
        link.download = 'converted.pdf';
        link.style.display = 'block';
        link.click();
        return;
      } else {
        dataUrl = canvas.toDataURL('image/' + format);
      }
      const link = document.getElementById('convertLink');
      link.href = dataUrl;
      link.download = 'converted.' + format;
      link.style.display = 'block';
      link.click();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(input);
}

function calculateAge() {
  const birthDate = new Date(document.getElementById('birthDate').value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  document.getElementById('ageResult').textContent = `Age: ${age} years`;
}

function calculateDateDifference() {
  const start = new Date(document.getElementById('startDate').value);
  const end = new Date(document.getElementById('endDate').value);
  const diff = Math.abs(end - start);
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  document.getElementById('dateDifferenceResult').textContent = `Difference: ${days} days`;
}

function calculateEMI() {
  const P = parseFloat(document.getElementById('loanAmount').value);
  const r = parseFloat(document.getElementById('interestRate').value) / 12 / 100;
  const n = parseFloat(document.getElementById('loanTenure').value);
  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  document.getElementById('emiResult').textContent = `EMI: ₹${emi.toFixed(2)}`;
}

function calculateSIP() {
  const A = parseFloat(document.getElementById('sipAmount').value);
  const r = parseFloat(document.getElementById('sipRate').value) / 12 / 100;
  const n = parseFloat(document.getElementById('sipTenure').value) * 12;
  const amount = A * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  document.getElementById('sipResult').textContent = `Maturity Amount: ₹${amount.toFixed(2)}`;
}

function calculateTotalInterest() {
  const P = parseFloat(document.getElementById('principalAmount').value);
  const R = parseFloat(document.getElementById('annualRate').value);
  const T = parseFloat(document.getElementById('timePeriod').value);
  const interest = (P * R * T) / 100;
  document.getElementById('interestResult').textContent = `Total Interest: ₹${interest.toFixed(2)}`;
}
