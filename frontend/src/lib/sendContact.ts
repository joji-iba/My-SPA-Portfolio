import * as v from 'valibot';
import type { ContactForm } from '../utils/validationSchema';
import { fetchJson } from './fetchJson';

const contactSuccess = v.object({ status: v.literal(1) });

export async function sendContact(url: string, { arg }: { arg: ContactForm }) {
  const result = await fetchJson(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  });
  return v.parse(contactSuccess, result);
}
