export async function getCaptchaToken(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    grecaptcha.ready(async () => {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) {
        reject(new Error("reCAPTCHA site key is not defined"));
        return;
      }

      const token = await grecaptcha.execute(siteKey, { action: "submit" });
      resolve(token);
    });
  });
}

export const verifyCaptchaToken = async (token: string): Promise<CaptchaResponse> => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    throw new Error("reCAPTCHA secret key is not defined");
  }

  const url = new URL("https://www.google.com/recaptcha/api/siteverify");
  url.searchParams.append("secret", secretKey);
  url.searchParams.append("response", token);

  const response = await fetch(url.toString(), {
    method: "POST",
  });

  const captchaData: CaptchaResponse = await response.json();

  if (!captchaData.success) {
    console.error("reCAPTCHA verification failed:", captchaData);
    return {
      success: false,
      "error-codes": captchaData["error-codes"] || ["unknown_error"],
    };
  }

  if (captchaData.score < 0.5) {
    console.warn("reCAPTCHA score is low:", captchaData.score);
    return {
      success: false,
      "error-codes": ["low_score"],
    };
  }

  return captchaData;
};

type CaptchaResponse =
  | {
      success: true;
      score: number;
      action: string;
      challenge_ts: string;
      hostname: string;
    }
  | {
      success: false;
      "error-codes": string[];
    };
