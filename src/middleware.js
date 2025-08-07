import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Hanya jalankan middleware untuk route yang dimulai dengan /admin
  if (pathname.startsWith('/admin')) {
    const isLoggedIn = request.cookies.get('isLoggedIn');

    // Kalau belum login, redirect ke halaman utama ("/")
    if (!isLoggedIn || isLoggedIn.value !== 'true') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Lanjut ke halaman yang diminta
  return NextResponse.next();
}

// Konfigurasi matcher agar hanya jalan di path /admin/*
export const config = {
  matcher: ['/admin/:path*'],
};
// This middleware checks if the user is logged in before allowing access to admin routes.