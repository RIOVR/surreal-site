const parseCookies = (header) => {
  const out = {};
  if (!header) return out;
  header.split(/;\s*/).forEach(pair => {
    const idx = pair.indexOf('=');
    if (idx === -1) return;
    out[pair.slice(0, idx).trim()] = decodeURIComponent(pair.slice(idx + 1).trim());
  });
  return out;
};

module.exports = async (req, res) => {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return res.status(500).send('OAUTH_GITHUB_CLIENT_ID/SECRET não configurados.');
  }

  const url = new URL(req.url, `https://${req.headers.host}`);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code) return res.status(400).send('Parâmetro "code" ausente.');

  const cookies = parseCookies(req.headers.cookie);
  if (!state || state !== cookies.oauth_state) {
    return res.status(400).send('State OAuth inválido (possível CSRF).');
  }

  let tokenResponse;
  try {
    tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });
  } catch (err) {
    return res.status(502).send('Falha ao contatar GitHub: ' + err.message);
  }

  const tokenJson = await tokenResponse.json();

  if (tokenJson.error) {
    return res.status(400).send('GitHub retornou erro: ' + tokenJson.error_description);
  }

  res.setHeader('Set-Cookie',
    'oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');

  const payload = {
    token: tokenJson.access_token,
    provider: 'github',
  };

  const html = `<!doctype html>
<html>
<head><meta charset="utf-8"><title>Autorizado</title></head>
<body style="font-family: system-ui; padding: 40px; background: #0A0A0A; color: #F2E9D8;">
<h2>Autorização concluída</h2>
<p>Voltando pro painel...</p>
<script>
  (function() {
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:success:' + JSON.stringify(${JSON.stringify(payload)}),
        e.origin
      );
      window.removeEventListener("message", receiveMessage, false);
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })();
</script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
};
