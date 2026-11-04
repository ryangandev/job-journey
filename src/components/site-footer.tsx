import { format } from 'date-fns';
import { FaGithub } from 'react-icons/fa';

const REPO_URL = 'https://github.com/ryangandev/job-journey';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-3 px-4 py-6 text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
        <small className="block text-xs">
          &copy; {format(new Date(), 'yyyy')} Ryan Gan. All rights reserved.
        </small>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md text-xs font-medium transition-colors hover:text-foreground"
        >
          <FaGithub className="size-4" aria-hidden />
          GitHub
        </a>
      </div>
    </footer>
  );
}
