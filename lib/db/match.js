import prisma from "./prisma";

export const addMultipleMatchesDb = async (matchesData) => {
  const matches = await prisma.match.createMany({
    data: matchesData,
    skipDuplicates: true,
  });

  return matches;
};
