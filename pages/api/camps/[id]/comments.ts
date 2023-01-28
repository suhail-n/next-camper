import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import prisma from '../../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    let { id } = req.query;

    let campId = Array.isArray(id) ? +id[0] : +id;
    if (isNaN(campId)) {
        res.status(400).json({
            code: 400,
            message: "Bad Request"
        })
    }


    if (req.method === "GET") {
        try {
            const comments = await prisma.comment.findMany({
                where: {
                    campId,
                },
                select: {
                    id: true,
                    body: true,
                    createdAt: true,
                    updatedAt: true,
                    owner: {
                        select: {
                            email: true,
                            firstName: true,
                            lastName: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
            res.status(200).json(comments.map(comment => ({
                ...comment, createdAt: comment.createdAt.toUTCString(),
                updatedAt: comment.updatedAt.toUTCString(),
            }))
            );
            return;
            // res.status(200).json({ ...comments });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                code: 500,
                message: "Internal Server Error"
            });
            return;
        }
    }
    const token = await getToken({ req });
    if (!token) {
        console.log("unauthorized");
        res.status(401).json({
            code: 401,
            message: "Unauthorized"
        });
        return;
    }
    if (req.method === "POST") {
        const comment: string = req.body.comment;
        if (!comment || !comment.trim() || comment.trim().length < 2) {
            res.status(400).json({
                code: 400,
                message: "Comment must be greater than 1 character"
            });
            return;
        }
        const user = await prisma.user.findFirst({ where: { email: token.email }, select: { id: true, firstName: true, lastName: true, email: true } });
        if (!user) {
            res.status(404).json({
                code: 404,
                message: "User not found"
            });
            return;
        }

        const created = await prisma.comment.create({
            data: {
                body: comment,
                campId,
                ownerId: user.id
            }
        });
        res.status(201).json({
            ...created,
            createdAt: created.createdAt.toUTCString(),
            updatedAt: created.updatedAt.toUTCString(),
            owner: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
        return;
    }
    if (req.method === "PATCH") {
        const comment: string = req.body.comment;
        const commentId: number = req.body.id;
        if (!comment || !comment.trim() || comment.trim().length < 2) {
            res.status(400).json({
                code: 400,
                message: "Comment must be greater than 1 character"
            });
            return;
        };
        const foundComment = await prisma.comment.findFirst({ where: { id: commentId, } });
        if (!foundComment) {
            res.status(404).json({
                code: 404,
                message: "Comment not found"
            });
            return;
        }
        try {
            const updated = await prisma.comment.update({
                where: {
                    id: commentId
                },
                data: {
                    body: {
                        set: comment
                    }
                },
                include: {
                    owner: {
                        select: {
                            email: true,
                            firstName: true,
                            lastName: true,
                        }
                    }
                }
            });
            res.status(200).json({
                ...updated,
                createdAt: updated.createdAt.toUTCString(),
                updatedAt: updated.updatedAt.toUTCString(),
            });
            return;
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: "internal server error"
            });
            return;
        }
    }
}
