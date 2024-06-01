import { useSession } from "next-auth/react";

const useCurrentUser = () => {
    const session = useSession();
    const user = session.data?.user;

    return user;
};

export default useCurrentUser;
