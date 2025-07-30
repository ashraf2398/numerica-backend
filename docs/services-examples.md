# Services Examples

## Example 1: Financial Advisory Services

```json
{
  "title": "Financial Advisory Services",
  "description": "We ensure all business transactions are accurately recorded, categorized, and reconciled to enable informed decisions.",
  "category": "Numerica",
  "features": [
    "Managing Accounts Receivable",
    "Accounts Payable",
    "Payroll and General Ledger",
    "Monthly bank and credit card reconciliations",
    "Expense tracking and classification",
    "Comprehensive financial reports (Income Statement, Balance Sheet, Cash Flow)",
    "Monthly financial summaries for performance insights"
  ],
  "icon": "finance-icon",
  "is_published": true
}
```

## Example 2: Tax Services

```json
{
  "title": "Tax Services",
  "description": "Our Tax Services aim to boost operational efficiency and deliver strategic financial insights.",
  "category": "Tax",
  "features": [
    "E-Invoicing Compliance: Registration and integration with ETA system",
    "VAT Services: Registration, returns, and advisory",
    "Corporate Income Tax: Preparation, filing, and strategic planning",
    "Payroll Tax Management: Calculating per Egyptian labor laws",
    "Withholding Tax: Controlling calculation and timely payment",
    "Tax Audit Representation: Acting on your behalf during ETA audits",
    "Tax Dispute Resolution: Assisting with objections and appeals",
    "International Tax & DTAs: Advising on cross-border transactions"
  ],
  "icon": "tax-icon",
  "is_published": true
}
```

## How to Use These Examples

1. **Login first** to get an authentication token:
   
   ```
   POST http://localhost:3001/api/admin/login
   Content-Type: application/json
   
   {
     "email": "admin@example.com",
     "password": "yourpassword"
   }
   ```

2. **Create Financial Advisory Service**:
   
   ```
   POST http://localhost:3001/api/admin/services
   Content-Type: application/json
   Authorization: Bearer your_token_here
   
   {
     "title": "Financial Advisory Services",
     "description": "We ensure all business transactions are accurately recorded, categorized, and reconciled to enable informed decisions.",
     "category": "Numerica",
     "features": [
       "Managing Accounts Receivable",
       "Accounts Payable",
       "Payroll and General Ledger",
       "Monthly bank and credit card reconciliations",
       "Expense tracking and classification",
       "Comprehensive financial reports (Income Statement, Balance Sheet, Cash Flow)",
       "Monthly financial summaries for performance insights"
     ],
     "icon": "finance-icon",
     "is_published": true
   }
   ```

3. **Create Tax Service**:
   
   ```
   POST http://localhost:3001/api/admin/services
   Content-Type: application/json
   Authorization: Bearer your_token_here
   
   {
     "title": "Tax Services",
     "description": "Our Tax Services aim to boost operational efficiency and deliver strategic financial insights.",
     "category": "Tax",
     "features": [
       "E-Invoicing Compliance: Registration and integration with ETA system",
       "VAT Services: Registration, returns, and advisory",
       "Corporate Income Tax: Preparation, filing, and strategic planning",
       "Payroll Tax Management: Calculating per Egyptian labor laws",
       "Withholding Tax: Controlling calculation and timely payment",
       "Tax Audit Representation: Acting on your behalf during ETA audits",
       "Tax Dispute Resolution: Assisting with objections and appeals",
       "International Tax & DTAs: Advising on cross-border transactions"
     ],
     "icon": "tax-icon",
     "is_published": true
   }
   ```

4. **View All Services** (public endpoint):
   
   ```
   GET http://localhost:3001/api/public/services
   ```

5. **View Services by Category**:
   
   ```
   GET http://localhost:3001/api/public/services/category/Tax
   ``` 