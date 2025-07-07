const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const url = require('url');
const { Log } = require('../Logging_Middleware/logMiddleware');

const shortLinks = new Map(); 
const clicks = new Map();     


function getExpiry(minutes) {
  return new Date(Date.now() + minutes * 60 * 1000);
}

router.post('/shorturls', async (req, res) => {
  const { url: originalUrl, validity = 30, shortcode } = req.body;

  if (!originalUrl || !/^https?:\/\/.+\..+/.test(originalUrl)) {
    await Log("backend", "error", "utils", "Invalid URL format");
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  let code = shortcode || nanoid(6);

  if (shortLinks.has(code)) {
    return res.status(409).json({ error: 'Shortcode already exists' });
  }

  const expiry = getExpiry(validity);

  shortLinks.set(code, {
    originalUrl,
    createdAt: new Date(),
    expiry,
    clicks: []
  });

  await Log("backend", "info", "utils", `Short URL created: ${code}`);

  return res.status(201).json({
    shortLink: `http://localhost:3000/${code}`,
    expiry: expiry.toISOString()
  });
});

router.get('/:shortcode', async (req, res) => {
  const { shortcode } = req.params;
  const record = shortLinks.get(shortcode);

  if (!record) {
    await Log("backend", "warn", "utils", `Shortcode not found: ${shortcode}`);
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  const now = new Date();
  if (now > record.expiry) {
    await Log("backend", "warn", "utils", `Shortcode expired: ${shortcode}`);
    return res.status(410).json({ error: 'Link expired' });
  }

  const clickData = {
    timestamp: now.toISOString(),
    referrer: req.get('Referrer') || 'Direct',
    location: req.ip
  };

  record.clicks.push(clickData);
  await Log("backend", "info", "utils", `Redirecting shortcode: ${shortcode}`);

  res.redirect(record.originalUrl);
});

router.get('/shorten/:shortcode', async (req, res) => {
  const { shortcode } = req.params;
  const record = shortLinks.get(shortcode);

  if (!record) {
    await Log("backend", "error", "utils", `Analytics request for unknown shortcode: ${shortcode}`);
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  return res.json({
    originalUrl: record.originalUrl,
    createdAt: record.createdAt,
    expiry: record.expiry,
    totalClicks: record.clicks.length,
    clickData: record.clicks
  });
});

module.exports = router;