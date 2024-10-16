import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch(
    'https://newsapi.org/v2/everything?q=Sustainable+Development+Goals&sortBy=relevancy&language=en&apiKey=99d61bff343e48a6b3c2e24c4d61eb96',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}