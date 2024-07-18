import prisma from "@/lib/prismadb";

import { EditFormSchema } from "@/app/(main)/players/_components/edit-profile-form";

import { Position } from "@prisma/client";

export async function editProfile(data: EditFormSchema, userId: string) {
  try {
    const school = formatSchool(data.school);
    const age = formatAge(data.dateOfBirth);
    const phoneNumber = formatPhoneNumber(data.phoneNumber);

    return await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        age,
        school,
        phoneNumber,
        address: {
          upsert: {
            create: { ...data.address },
            update: { ...data.address },
          },
        },
        positions: {
          deleteMany: {}, // Remove existing positions
          create: data.positions.map((position) => ({
            position: position as Position,
          })),
        },
      },
    });
  } catch (error) {
    console.log("Failed to update progile", error);
    throw error;
  }
}

const formatSchool = (school: string) => {
  return school
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const formatPhoneNumber = (phoneNumber: string) => {
  // Remove non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  if (cleaned.length !== 10) {
    throw new Error("Phone number must be 10 digits long");
  }

  // Regex to capture the area code, central office code, and station code
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  return match ? `(${match[1]}) ${match[2]} - ${match[3]}` : "";
};

const formatAge = (DOB: string) => {
  const birthDate = new Date(DOB);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
