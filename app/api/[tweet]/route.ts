import { NextResponse } from 'next/server';
import { getTweet } from 'react-tweet/api';

export async function GET(request: Request) {
  const id = request.url.split('/').pop();

  if (!id) {
    return NextResponse.redirect('/404');
  }

  try {
    const tweet = await getTweet(id);
    if (!tweet) {
      return NextResponse.redirect('/404');
    }
    return NextResponse.json({ data: tweet });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'error.message' ?? 'Bad request.' });
  }
}