import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

type FavoriteToggleProps = {
  isFavorite: boolean;
  onToggle: () => void;
  onIconComponent?: React.ReactNode;
  offIconComponent?: React.ReactNode;
};

export default function FavoriteToggle({
  isFavorite,
  onToggle,
  onIconComponent,
  offIconComponent,
}: FavoriteToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex rounded-full bg-none p-1.5 hover:bg-[#95969940] active:bg-[#95969960]"
    >
      <span
        className={`text-2xl ${
          isFavorite ? 'text-red-500' : 'text-light-200 dark:text-dark-200'
        } `}
      >
        {isFavorite
          ? onIconComponent || <MdFavorite />
          : offIconComponent || <MdFavoriteBorder />}
      </span>
    </button>
  );
}
