import { jsPDF } from "jspdf";

export function generateReceipt(data: {
  donorName: string;
  email: string;
  phone: string;
  amount: number;
  transactionId: string;
  date: string;
}) {
  const doc = new jsPDF();
  
  const margin = 20;
  let yPos = 20;

  // Simple border
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.rect(10, 10, 190, 277);

  // Logo placeholder - Add your base64 string here
  // try {
  //   const logoBase64 = 'YOUR_BASE64_STRING_HERE';
  //   doc.addImage(`data:image/png;base64,${logoBase64}`, 'PNG', margin, yPos, 40, 20);
  //   yPos += 25;
  // } catch (e) {
  //   console.log('Logo not available');
  // }

  // Organization name
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Mahila Swashthya Mission", margin, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Shop no. 14 Mahajan complex, sector 4B, avas vikas, sikandra, agra - 282007", margin, yPos);
  yPos += 5;
  doc.text("Email: help@mahilaswashthyamission.in  |  Phone: +91 95575 13058", margin, yPos);
  yPos += 10;

  // Divider line
  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, 190, yPos);
  yPos += 10;

  // Receipt title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("DONATION RECEIPT", margin, yPos);
  yPos += 10;

  // Receipt details
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Receipt No: ${data.transactionId}`, margin, yPos);
  yPos += 6;
  doc.text(`Date: ${data.date}`, margin, yPos);
  yPos += 6;
  doc.text("Payment Mode: Online (Razorpay)", margin, yPos);
  yPos += 12;

  // Divider line
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPos, 190, yPos);
  yPos += 10;

  // Donor Information
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Donor Information", margin, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${data.donorName}`, margin, yPos);
  yPos += 6;
  doc.text(`Email: ${data.email}`, margin, yPos);
  yPos += 6;
  doc.text(`Phone: ${data.phone}`, margin, yPos);
  yPos += 12;

  // Divider line
  doc.line(margin, yPos, 190, yPos);
  yPos += 10;

  // Donation Amount - Simple box
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, yPos, 170, 25, "F");
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Donation Amount:", margin + 5, yPos + 10);
  
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(`Rs. ${data.amount.toLocaleString("en-IN")}`, margin + 5, yPos + 20);
  yPos += 30;

  // Divider line
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPos, 190, yPos);
  yPos += 10;

  // Tax Information
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Tax Benefit Information", margin, yPos);
  yPos += 7;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("This donation is eligible for tax deduction under Section 80G of the Income Tax Act.", margin, yPos);
  yPos += 5;
  doc.text("Please retain this receipt for your tax filing purposes.", margin, yPos);
  yPos += 15;

  // Footer
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, 260, 190, 260);

  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for your generous contribution!", margin, 268);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("This is a computer-generated receipt and does not require a physical signature.", margin, 275);

  return doc.output("arraybuffer");
}
