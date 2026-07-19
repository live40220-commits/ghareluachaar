import emailjs from 'emailjs-com';

// -------------------------------------------------------------------
// 1️⃣ EmailJS configuration – values are read from .env.local.
//    All keys are prefixed with NEXT_PUBLIC_ so they are exposed client‑side.
// -------------------------------------------------------------------
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!;

const TEMPLATE_WELCOME = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_WELCOME!;
const TEMPLATE_ORDER_CANCEL = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ORDER_CANCEL!;
const TEMPLATE_ORDER_NEW = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ORDER_NEW!;
const TEMPLATE_CONTACT = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT!;

/** Generic send helper – logs success / failure for debugging. */
export async function sendEmail(
  templateId: string,
  templateParams: Record<string, unknown>
): Promise<void> {
  try {
    await emailjs.send(SERVICE_ID, templateId, templateParams, USER_ID);
    console.log(`📧 Email (template ${templateId}) sent successfully.`);
  } catch (err) {
    console.error('❗ EmailJS error →', err);
  }
}

// -------------------------------------------------------------------
// 2️⃣ Welcome‑new‑customer email (already used in the registration flow).
// -------------------------------------------------------------------
export const sendWelcomeEmail = async (user: { name: string; email: string }) => {
  const params = {
    to_name: user.name,
    to_email: user.email,
    site_name: 'Gharelu Achaar',
    support_email: 'support@ghareluachaar.pk',
  };
  await sendEmail(TEMPLATE_WELCOME, params);
};

// -------------------------------------------------------------------
// 3️⃣ Order‑cancellation email (already used in the admin flow).
// -------------------------------------------------------------------
export const sendOrderCancelEmail = async (order: {
  id: string;
  email: string;
  items: string;
}) => {
  const params = {
    order_id: order.id,
    to_email: order.email,
    order_items: order.items,
    site_name: 'Gharelu Achaar',
    support_email: 'support@ghareluachaar.pk',
  };
  await sendEmail(TEMPLATE_ORDER_CANCEL, params);
};

// -------------------------------------------------------------------
// 4️⃣ New‑order email – sent to the store owner when a customer places an order.
// -------------------------------------------------------------------
export const sendNewOrderEmail = async (payload: {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  order_id: string;
  product_name: string;
  quantity: number | string;
  total_amount: number | string;
  address: string;
  order_date: string;
}) => {
  await sendEmail(TEMPLATE_ORDER_NEW, payload);
};

// -------------------------------------------------------------------
// 5️⃣ Contact‑form email – notifies the business of a new inquiry.
// -------------------------------------------------------------------
export const sendContactEmail = async (payload: {
  customer_name: string;
  customer_email: string;
  subject: string;
  message: string;
  date: string;
}) => {
  await sendEmail(TEMPLATE_CONTACT, payload);
};
