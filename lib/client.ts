import DB, { Camp, Comments } from "./db";

export function getCamp(id: number): Camp | {} {
  return DB.camps.find((camp) => camp.id === id) ?? {};
}

export async function getCamps() {
  return [...DB.camps];
  // const camps = await prisma.camp.findMany({
  //   include: {
  //     author: {
  //       select: {
  //         name: true
  //       }
  //     }
  //   }
  // });
  // return camps.map(camp => ({ ...camp, createdAt: camp.createdAt.toUTCString(), updatedAt: camp.updatedAt.toUTCString() }));
}

export type CampComments = {
  id: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  owner: {
    email: string;
    firstName: string;
    lastName: string;
  }
}

type ErrorResponse = {
  code: number;
  message: string;
}

export async function getCampComments(campId: number, signal: AbortSignal = null) {
  return fetch(`/api/camps/${campId}/comments`, {
    method: "GET",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function createCampComments(campId: number, comment: string, signal: AbortSignal = null) {
  return fetch(`/api/camps/${campId}/comments`, {
    method: "POST",
    signal,
    body: JSON.stringify({
      comment
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function updateComments(commentId: string, body: string) {
  const comment = DB.comments.find((c) => c.id === commentId);
  if (!comment) return;
  comment.body = body;
}
