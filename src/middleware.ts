import { NextRequest, NextResponse } from 'next/server';

const USER = process.env.BASIC_AUTH_USER;
const PASSWORD = process.env.BASIC_AUTH_PASSWORD;
const ENVIRONMENT = process.env.ENVIRONMENT;

console.log('⭐️⭐️');
console.log('USER:', USER);
console.log('PASSWORD:', PASSWORD);
console.log('ENVIRONMENT:', ENVIRONMENT);
console.log('⭐️⭐️');

export const config = {
    matcher: '/:path*'
};

export default function middleware(req: NextRequest) {

    if (ENVIRONMENT !== 'test') {
        return NextResponse.next();
    }

    const basicAuth = req.headers.get('authorization');
    if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        const [user, password] = atob(authValue).split(':');

        if (user === USER && password === PASSWORD) {
            return NextResponse.next();
        }
    }

    return new NextResponse('Unauthorized.', {
        status: 401,
        headers: {
            'WWW-authenticate': 'Basic realm="Secure Area"'
        }
    });
}
