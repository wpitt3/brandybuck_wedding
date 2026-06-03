import { useState } from 'react';

const ACCESS_KEY = '9a23fc611e784bc5b625cd0bf2f18b16';

/**
 * useSplitforms — submits RSVP data to Splitforms.
 *
 * Returns { submit, status }
 *   status: 'idle' | 'sending' | 'sent' | 'error'
 */
export function useSplitforms() {
  const [status, setStatus] = useState('idle');

  async function submit({ attending, guests, message }) {
    setStatus('sending');

    const data = new FormData();
    data.set('access_key', ACCESS_KEY);
    data.set('subject', 'Helen & Will Wedding — New RSVP');
    data.set('attending', attending === 'yes' ? 'Yes' : 'No');
    data.set('message', message || '');

    if (attending === 'yes') {
      data.set('guest_count', guests.length);
      guests.forEach((g, i) => {
        const n = i + 1;
        data.set(`guest_${n}_name`, g.name);
        data.set(`guest_${n}_dietary`, g.dietary || 'No requirements');
        if (g.dietary === 'Other (please specify)' && g.other) {
          data.set(`guest_${n}_dietary_detail`, g.other);
        }
      });
    }

    try {
      const res = await fetch('https://splitforms.com/api/submit', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      const json = await res.json();
      setStatus(json.success ? 'sent' : 'error');
      return json.success;
    } catch {
      setStatus('error');
      return false;
    }
  }

  return { submit, status };
}
