let hasValidHeader = (request: Request, env: Env) => {
	return request.headers.get('X-Custom-Auth-Key') === env.AUTH_KEY;
};

export function authorizeRequest(request: Request, env: Env) {
	switch (request.method) {
		case 'POST':
			return hasValidHeader(request, env);
		case 'GET': {
			let url = new URL(request.url);
			if (url.pathname !== '/') return false;
			return true;
		}
		default:
			return false;
	}
}
