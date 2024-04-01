import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

interface FavoriteToggleProps {
    isFavorite: boolean;
    onToggle: () => void;
    onIconComponent?: React.ReactNode;
    offIconComponent?: React.ReactNode;
}

export default function FavoriteToggle({
    isFavorite,
    onToggle,
    onIconComponent,
    offIconComponent,
}: FavoriteToggleProps) {
    return (
        <button
            onClick={onToggle}
            className="flex p-1.5 rounded-full bg-none hover:bg-[#95969940] active:bg-[#95969960]"
        >
            <span
                className={`text-2xl  ${
                    isFavorite
                        ? "text-red-500"
                        : "text-light-200 dark:text-dark-200"
                } `}
            >
                {isFavorite
                    ? onIconComponent || <MdFavorite />
                    : offIconComponent || <MdFavoriteBorder />}
            </span>
        </button>
    );
}
