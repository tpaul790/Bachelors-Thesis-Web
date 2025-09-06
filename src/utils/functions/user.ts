import {UserRole} from "../../user/dto/UserDtos.ts";

export const isAdmin = (userRole: UserRole) =>
    userRole !== undefined && userRole === UserRole.ADMIN;

export const isUser = (userRole: UserRole) =>
    userRole !== undefined && userRole === UserRole.USER;




const images = import.meta.glob("/src/resources/avatarIcons/*.png", {
    eager: true
});

export const Feedback = {
    SUCCESS: "Profile updated successfully!",
    ERROR: "Failed to update profile. Please try again.",
    SUCCESS_EDIT_STORY: "Story updated successfully!",
    ERROR_EDIT_STORY: "Failed to update story. Please try again."
} as const;

export const avatarIcons = Object.entries(images).map(([path, mod]: any) => {
    const match = path.match(/icon(\d+)\.png$/);
    const iconNumber = match ? parseInt(match[1], 10) : 0;
    return { src: mod.default, iconNumber };
});

export const getAvatarByIconNumber = (
    iconNumber: number
): string | undefined => {
    const found = avatarIcons.find(icon => icon.iconNumber === iconNumber);
    return found?.src;
};