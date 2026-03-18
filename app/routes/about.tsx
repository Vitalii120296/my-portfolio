import { About } from '@/pages/About';
import { HomePage } from '@/pages/HomePage';

export function meta() {
  return [
    { title: 'V. Hulaievych | Portfolio' },
    {
      name: 'Vitalii Hulaievych portfolio',
      content: 'Welcome to my portfolio'
    }
  ];
}

export default function Home() {
  return <About />;
}
