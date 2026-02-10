import { Router, Request, Response } from 'express';

const router = Router();
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET;
const VERIFY_URL = 'https://hcaptcha.com/siteverify';

export interface VerifyCaptchaBody {
  token: string;
}

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body as VerifyCaptchaBody;

  if (!token || typeof token !== 'string') {
    res.status(400).json({ success: false, error: 'Missing or invalid token' });
    return;
  }

  if (!HCAPTCHA_SECRET) {
    console.warn('HCAPTCHA_SECRET not set');
    res.status(503).json({ success: false, error: 'Captcha not configured' });
    return;
  }

  try {
    const form = new URLSearchParams();
    form.set('secret', HCAPTCHA_SECRET);
    form.set('response', token);

    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      body: form,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const data = (await response.json()) as {
      success?: boolean;
      'error-codes'?: string[];
    };

    if (data.success) {
      res.json({ success: true });
      return;
    }

    res.status(400).json({
      success: false,
      error: 'Captcha verification failed',
      codes: data['error-codes'],
    });
  } catch (err) {
    console.error('Captcha verify error:', err);
    res.status(500).json({ success: false, error: 'Verification error' });
  }
});

export { router as verifyCaptchaRouter };
