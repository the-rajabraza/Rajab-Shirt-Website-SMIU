interface OrderData {
  orderNumber: string;
  orderDate: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    image: string;
  }>;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
}

export function generateOrderEmailHTML(orderData: OrderData): string {
  const itemsHTML = orderData.items.map((item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #eee;">
        <div style="display: flex; align-items: center;">
          <img src="${item.image || '/placeholder.svg'}" alt="${item.name}" style="width: 60px; height: 60px; border-radius: 8px; margin-right: 12px;">
          <div>
            <div style="font-weight: 600; color: #333;">${item.name}</div>
            <div style="color: #666; font-size: 14px;">Size: ${item.size}</div>
            <div style="color: #666; font-size: 14px;">Quantity: ${item.quantity}</div>
          </div>
        </div>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right; font-weight: 600;">
        Rs. ${(item.price * item.quantity).toLocaleString()}
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - Tee Labs</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #eee; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
        .order-number { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .total-row { background: #f8f9fa; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">Order Confirmed</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your purchase</p>
        </div>
        
        <div class="content">
          <div class="order-number">
            <h2 style="margin: 0; color: #1976d2;">Order #${orderData.orderNumber}</h2>
            <p style="margin: 5px 0 0 0; color: #666;">Placed on ${orderData.orderDate}</p>
          </div>

          <h3>Order Details</h3>
          <table class="table">
            <tr>
              <td style="padding: 8px 0;"><strong>Order Number:</strong></td>
              <td style="padding: 8px 0;">${orderData.orderNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Payment Method:</strong></td>
              <td style="padding: 8px 0;">${orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : orderData.paymentMethod === 'bank' ? 'Bank Transfer' : 'Easypaisa/JazzCash'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Status:</strong></td>
              <td style="padding: 8px 0; color: #28a745; font-weight: bold;">${orderData.status}</td>
            </tr>
          </table>

          <h3>Shipping Information</h3>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p style="margin: 5px 0;"><strong>${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}</strong></p>
            <p style="margin: 5px 0;">${orderData.customerInfo.address}</p>
            <p style="margin: 5px 0;">${orderData.customerInfo.city}, ${orderData.customerInfo.postalCode}, Pakistan</p>
            <p style="margin: 5px 0;">Phone: ${orderData.customerInfo.phone}</p>
            <p style="margin: 5px 0;">Email: ${orderData.customerInfo.email}</p>
          </div>

          <h3>Order Items</h3>
          <table class="table">
            <thead>
              <tr style="background: #f8f9fa;">
                <th style="padding: 12px; text-align: left;">Item</th>
                <th style="padding: 12px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
          </table>

          <div style="border-top: 2px solid #eee; padding-top: 20px; margin-top: 20px;">
            <table style="width: 100%;">
              <tr>
                <td style="padding: 8px 0;"><strong>Subtotal:</strong></td>
                <td style="padding: 8px 0; text-align: right;">Rs. ${orderData.subtotal.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Shipping:</strong></td>
                <td style="padding: 8px 0; text-align: right; color: #666;">Charges calculated upon WhatsApp</td>
              </tr>
              <tr class="total-row">
                <td style="padding: 12px 0; font-size: 18px;"><strong>Total:</strong></td>
                <td style="padding: 12px 0; text-align: right; font-size: 18px; color: #667eea;"><strong>Rs. ${orderData.total.toLocaleString()}</strong></td>
              </tr>
            </table>
          </div>

          <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin: 0 0 10px 0; color: #2e7d32;">What's Next?</h4>
            <p style="margin: 0; color: #2e7d32;">
              We'll process your order and send you tracking details once it's shipped. Expected delivery: 3-5 business days.
            </p>
          </div>
        </div>

        <div class="footer">
          <p style="margin: 0; color: #666; font-size: 14px;">
            © 2025 Tee Labs. Crafted with passion for style.
          </p>
          <p style="margin: 10px 0 0 0; color: #666; font-size: 12px;">
            If you have any questions, contact us at zubairkhatri92@gmail.com
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}
