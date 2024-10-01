import { format } from 'date-fns';

export default function Footer() {
  return (
    <footer className="border-t p-4 text-center text-gray-500 md:p-6">
      <small className="block text-xs">
        &copy; {format(new Date(), 'yyyy')} Ryan Gan. All rights reserved.
      </small>
    </footer>
  );
}
