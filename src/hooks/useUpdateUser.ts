// src/hooks/useUpdateUser.ts
import api from "../../client";
import { useUser } from "./useUser";
import { Alert } from "react-native";

export const useUpdateUser = () => {
  const { user } = useUser();

  const updateUser = async (data: any) => {
    if (!user) throw new Error("No user logged");

    const response = await api.put(`/users/update`, {
      id: user.id,
      ...data,
    });

    return response.data;
  };

  const uploadProfileImage = async (imageAsset: any) => {
    if (!user) throw new Error("No user logged");

    const formData = new FormData();
    formData.append("file", {
      uri: imageAsset.uri,
      name: "profile.jpg",
      type: "image/jpeg",
    });

    const response = await api.post(
      `/users/upload-image/${user.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data; // backend returns String (imageUrl)
  };

  return {
    updateUser,
    uploadProfileImage,
  };
};
