import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { NewCampSchema } from '../../../validation/camps';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req });
    if (!token) {
        console.log("unauthorized");
        res.status(401).json({
            code: 401,
            message: "Unauthorized"
        });
    }

    if (req.method === "POST") {
        // let body: { title: string, image: string, rating: number, content: string } = req.body;
        let body;
        try {
            body = await NewCampSchema.validate(req.body, { strict: true, abortEarly: false });
        } catch (error) {
            res.status(400).json({
                code: 400,
                message: error.errors.join("\n")
            });
        }
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: token.email
                }
            });
            const camp = await prisma.camp.create({
                data: {
                    content: body.content,
                    image: body.image,
                    rating: body.rating,
                    title: body.title,
                    authorId: user.id
                },
                include: {
                    author: true
                }
            });
            res.status(200).json({ ...camp });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                code: 500,
                message: "Internal Server Error"
            });
        }
    }
}
