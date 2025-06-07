import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApi";
import { User } from "../models/user";

const useGetCurrentUserProfile = ():UseQueryResult<User,Error> => {
  const access_token = localStorage.getItem("access_token");
  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: getCurrentUserProfile,
    enabled: !!access_token,
  });
};

export default useGetCurrentUserProfile;
