import { Button } from "@nextui-org/button";
import { CiEdit } from "react-icons/ci";

export default function EditButton({ onPress }: { onPress: () => void }) {
    return (
        <Button
            isIconOnly
            aria-label="Edit"
            variant="light"
            size="sm"
            onPress={onPress}
        >
            <CiEdit className="text-lg" />
        </Button>
    );
}
