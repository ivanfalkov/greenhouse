module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return res.status(500).json({
        ok: false,
        error: 'Telegram is not configured (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID missing)',
      });
    }

    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const name = (body && body.name ? String(body.name) : '').trim();
    const phone = (body && body.phone ? String(body.phone) : '').trim();

    if (!name || name.length < 2) {
      return res.status(400).json({ ok: false, error: 'Invalid name' });
    }
    if (!phone || phone.length < 10) {
      return res.status(400).json({ ok: false, error: 'Invalid phone' });
    }

    const text =
      `Новая заявка с сайта ТеплицыЛенОбл\n` +
      `Имя: <b>${escapeHtml(name)}</b>\n` +
      `Телефон: <b>${escapeHtml(phone)}</b>`;

    const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const tgResp = await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const tgData = await tgResp.json().catch(() => null);

    if (!tgResp.ok || !tgData || !tgData.ok) {
      return res.status(500).json({
        ok: false,
        error: 'Telegram send failed',
        detail: tgData && tgData.description ? tgData.description : undefined,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: 'Server error',
    });
  }
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

