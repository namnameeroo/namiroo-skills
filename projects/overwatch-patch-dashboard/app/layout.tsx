import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: '오버워치 패치 대시보드',
  description:
    '오버워치 패치 노트를 영웅 단위로 모아 보고, 버프/너프 추이를 시각화하는 토이 대시보드.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        <header className="border-b border-ow-border/60 bg-ow-dark/60 backdrop-blur sticky top-0 z-30">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-block h-7 w-7 rounded-md bg-gradient-to-br from-ow-orange to-ow-blue" />
              <span className="text-lg font-bold tracking-tight">
                오버워치 패치 대시보드
              </span>
            </Link>
            <nav className="flex items-center gap-2 text-sm text-slate-300">
              <Link href="/" className="hover:text-white">
                패치
              </Link>
              <span className="text-ow-muted">·</span>
              <Link href="/heroes" className="hover:text-white">
                영웅
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
        <footer className="mx-auto max-w-6xl px-6 py-10 text-center text-xs text-ow-muted">
          토이프로젝트 · 데이터는 샘플이며 공식/커뮤니티 소스에서 채워 넣을 수
          있는 구조입니다.
        </footer>
      </body>
    </html>
  );
}
