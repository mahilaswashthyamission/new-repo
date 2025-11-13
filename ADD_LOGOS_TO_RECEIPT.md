# How to Add Logos to PDF Receipt

The PDF receipt is designed to include your organization logo and Razorpay logo. To add them, follow these steps:

## Step 1: Convert Images to Base64

You need to convert your logo images to base64 strings.

### Option A: Online Converter
1. Go to https://www.base64-image.de/
2. Upload `public/LOGO01.png`
3. Copy the base64 string (it will start with `data:image/png;base64,`)

### Option B: Using Node.js
```javascript
const fs = require('fs');
const imageBuffer = fs.readFileSync('public/LOGO01.png');
const base64Image = imageBuffer.toString('base64');
console.log(`data:image/png;base64,${base64Image}`);
```

### Option C: Using Command Line
```bash
# On Windows (PowerShell)
[Convert]::ToBase64String([IO.File]::ReadAllBytes("public\LOGO01.png"))

# On Mac/Linux
base64 public/LOGO01.png
```

## Step 2: Add Logo to Receipt

Open `src/lib/receipt.ts` and find this section:

```typescript
// Try to add organization logo (if LOGO01.png exists in public folder)
// Note: Logo will be added as base64 - you need to convert LOGO01.png to base64
// For now, we'll use text. To add logo, uncomment and add base64 string:
// try {
//   doc.addImage('data:image/png;base64,YOUR_BASE64_HERE', 'PNG', 20, 20, 30, 15);
// } catch (e) {
//   console.log('Logo not available');
// }
```

Replace it with:

```typescript
// Add organization logo
try {
  const orgLogo = 'data:image/png;base64,YOUR_LOGO_BASE64_STRING_HERE';
  doc.addImage(orgLogo, 'PNG', 20, 20, 35, 18); // x, y, width, height
} catch (e) {
  console.log('Logo not available');
}
```

## Step 3: Add Razorpay Logo (Optional)

Similarly, you can add the Razorpay logo:

```typescript
// Add Razorpay logo in payment section
try {
  const razorpayLogo = 'data:image/png;base64,RAZORPAY_LOGO_BASE64_HERE';
  doc.addImage(razorpayLogo, 'PNG', pageWidth / 2 + 10, 68, 20, 8);
} catch (e) {
  console.log('Razorpay logo not available');
}
```

## Logo Specifications

### Organization Logo (LOGO01.png)
- **Position**: Top left of header
- **Recommended size**: 35mm width x 18mm height
- **Format**: PNG with transparent background preferred
- **Location in PDF**: x=20, y=20

### Razorpay Logo
- **Position**: Next to "Payment Mode" text
- **Recommended size**: 20mm width x 8mm height
- **Format**: PNG
- **Location in PDF**: x=pageWidth/2+10, y=68

## Example with Both Logos

```typescript
export function generateReceipt(data: {
  // ... parameters
}) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Organization Logo
  const orgLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'; // Your base64 here
  try {
    doc.addImage(orgLogo, 'PNG', 20, 20, 35, 18);
  } catch (e) {
    console.log('Org logo error:', e);
  }
  
  // Razorpay Logo (optional)
  const razorpayLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'; // Razorpay base64
  try {
    doc.addImage(razorpayLogo, 'PNG', pageWidth / 2 + 10, 68, 20, 8);
  } catch (e) {
    console.log('Razorpay logo error:', e);
  }
  
  // Rest of the receipt code...
}
```

## Tips

1. **Keep base64 strings in a separate file** for better organization:
   ```typescript
   // src/lib/receipt-assets.ts
   export const ORG_LOGO_BASE64 = 'data:image/png;base64,...';
   export const RAZORPAY_LOGO_BASE64 = 'data:image/png;base64,...';
   ```

2. **Optimize images** before converting to base64:
   - Resize to exact dimensions needed
   - Compress to reduce file size
   - Use PNG for logos with transparency

3. **Test the PDF** after adding logos to ensure they display correctly

## Razorpay Logo

You can download the official Razorpay logo from:
- https://razorpay.com/newsroom/brand-assets/

Make sure to follow their brand guidelines when using their logo.

## Current Status

The receipt currently uses:
- ✅ Text-based organization name (professional typography)
- ✅ Razorpay text in brand blue color (#0066CC)
- ⏳ Logo placeholders ready (just add base64 strings)

Once you add the base64 strings, the logos will automatically appear in the PDF!
