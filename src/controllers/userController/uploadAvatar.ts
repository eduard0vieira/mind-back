import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import prisma from '../../config/prisma';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (_req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});
export const upload = multer({ storage });

export const uploadAvatar = async (req: any, res: Response) => {
  try {
    const { filename } = req.file;
    const userId = (req as any).userId;
    const imagePath = `/uploads/${filename}`;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { image: imagePath },
      select: { image: true },
    });

    res.json({ image: user.image });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
