import Link from 'next/link';

import { CreatePost } from '~/app/_components/CreatePost';
import { api } from '~/trpc/server';

const HomePage = async () => {
  const hello = await api.post.hello.query({ text: 'from tRPC' });

  return (
    <main>
      <div>
        <h1>
          Create <span>T3</span> App
        </h1>
        <div>
          <Link
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3>First Steps →</h3>
            <div>
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link href="https://create.t3.gg/en/introduction" target="_blank">
            <h3>Documentation →</h3>
            <div>
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div>
        <div>
          <p>{hello ? hello.greeting : 'Loading tRPC query...'}</p>
        </div>

        <CrudShowcase />
      </div>
    </main>
  );
};

const CrudShowcase = async () => {
  const latestPost = await api.post.getLatest.query();

  return (
    <div>
      {latestPost ? (
        <p>Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
};

export default HomePage;
