export const MAIL_SUBJECT = {
  REGISTRATION: 'Welcome to GTBank',
  DEBIT: 'Debit Alert',
  CREDIT: 'Credit Alert',
};

export const MAIL_MESSAGE = {
  REGISTRATION: (accountNumber: string, pin: string) => `
		  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Bank Account Details</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      h1,
      p {
        text-align: center;
      }
      .details {
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #f9f9f9;
        border-radius: 5px;
      }
      .details p {
        margin: 10px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Your New Bank Account Details</h1>
      <p>
        We are thrilled to inform you that your bank account with GTBank
        has been successfully created. Please find your account details below:
      </p>
      <div class="details">
        <p><strong>Account Number:</strong> ${accountNumber}</p>
        <p><strong>PIN:</strong> ${pin}</p>
      </div>
      <p>
        With this account, you now have access to a range of banking services
        and benefits. Should you have any questions or need assistance, please
        do not hesitate to contact our customer service team at [Customer
        Service Number].
      </p>
      <p>Thank you for choosing GT Bank. We look forward to serving you!</p>
    </div>
  </body>
</html>
		`,
  DEBIT: (amount: number, balance: number, accountNumber: number) => `
          <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ATM Receipt</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f5f5f5;
      }
      .receipt {
        max-width: 300px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        text-align: center;
        margin-bottom: 20px;
      }
      .receipt-item {
        margin-bottom: 10px;
      }
      .receipt-item label {
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="receipt">
      <h1>ATM Receipt</h1>
      <div class="receipt-item"><label>Date:</label> ${new Intl.DateTimeFormat(
        'en',
        { day: 'numeric', month: 'long', year: 'numeric' },
      ).format(new Date())}</div>
      <div class="receipt-item"><label>Time:</label>${new Intl.DateTimeFormat(
        'en',
        { hour: 'numeric', minute: 'numeric', hour12: true },
      ).format(new Date())}</div>
      <div class="receipt-item">
        <label>ATM Location:</label> Main Street Branch
      </div>
      <div class="receipt-item">
        <label>Transaction Type:</label> Withdrawal
      </div>
      <div class="receipt-item"><label>Amount:</label> N${amount}.00</div>
      <div class="receipt-item"><label>Account Number:${accountNumber}</label> </div>
      <div class="receipt-item"><label>Available Balance:</label> N${balance}.00</div>
      <hr />
      <div class="receipt-item">
        <p>Thank you for using our ATM</p>
      </div>
    </div>
  </body>
</html>
  `,
  CREDIT: (amount: number, from: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Transfer Credit Receipt Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
      }
      p {
        margin-bottom: 10px;
      }
      .details {
        margin-top: 20px;
      }
      .details table {
        width: 100%;
        border-collapse: collapse;
      }
      .details th,
      .details td {
        padding: 8px;
        border-bottom: 1px solid #ddd;
      }
      .details th {
        background-color: #f4f4f4;
        text-align: left;
      }
      .footer {
        margin-top: 20px;
        font-size: 14px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Transfer Credit Receipt Confirmation</h1>
      <div class="details">
        <table>
          <tr>
            <th>Transfer From:</th>
            <td>${from}</td>
          </tr>
          <tr>
            <th>Amount Transferred:</th>
            <td>N${amount}</td>
          </tr>
          <tr>
            <th>Date of Transfer:</th>
            <td>
            ${new Intl.DateTimeFormat('en', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }).format(new Date())}
            </td>
          </tr>
        </table>
      </div>
      <p>
        If you have any questions or concerns regarding your transfer credit or
        any other matter, please feel free to reach out to our customer support
        team at [Customer Support Contact Information].
      </p>
      <p>
        Thank you for choosing GTBank. We appreciate your business and look
        forward to serving you in the future.
      </p>
    </div>
  </body>
</html>`,

  TRANSFER_DEBIT: (
    amount: number,
    balance: number,
    accountNumber: number,
    recipient: string,
  ) => `
          <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ATM Receipt</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f5f5f5;
      }
      .receipt {
        max-width: 300px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        text-align: center;
        margin-bottom: 20px;
      }
      .receipt-item {
        margin-bottom: 10px;
      }
      .receipt-item label {
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="receipt">
      <h1>ATM Receipt</h1>
      <div class="receipt-item"><label>Date:</label> ${new Intl.DateTimeFormat(
        'en',
        { day: 'numeric', month: 'long', year: 'numeric' },
      ).format(new Date())}</div>
      <div class="receipt-item"><label>Time:</label>${new Intl.DateTimeFormat(
        'en',
        { hour: 'numeric', minute: 'numeric', hour12: true },
      ).format(new Date())}</div>
      <div class="receipt-item">
        <label>Recipient:</label>${recipient} 
      </div>
      <div class="receipt-item">
        <label>Transaction Type:</label>Tansfer 
      </div>
      <div class="receipt-item"><label>Amount:</label> N${amount}.00</div>
      <div class="receipt-item"><label>Account Number:${accountNumber}</label> </div>
      <div class="receipt-item"><label>Available Balance:</label> N${balance}.00</div>
      <hr />
      <div class="receipt-item">
        <p>Thank you for using our ATM</p>
      </div>
    </div>
  </body>
</html>
  `,
};
