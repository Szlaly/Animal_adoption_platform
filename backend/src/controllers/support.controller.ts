import { Request, Response } from 'express';
import { Support } from '../models/support.model';

export const createSupportRequest = async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).user.id;
  const { subject, message } = req.body;

  if (!subject || !message) {
    return res.status(400).json({ message: 'A tárgy és az üzenet megadása kötelező.' });
  }

  try {
    const support = new Support({ user: userId, subject, message });
    await support.save();
    res.status(201).json({ message: 'Support kérés elküldve', support });
  } catch (err) {
    res.status(500).json({ message: 'Hiba történt a mentés során', error: err });
  }
};

export const getAllSupportRequests = async (_req: Request, res: Response) => {
  try {
    const supports = await Support.find().populate('user', 'name email');
    res.json(supports);
  } catch (err) {
    res.status(500).json({ message: 'Hiba a lekérdezés során', error: err });
  }
};
export const getUserSupportRequests = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const supports = await Support.find({ user: userId });
    res.json(supports);
  } catch (err) {
    res.status(500).json({ message: 'Hiba a saját kérdések lekérdezésekor', error: err });
  }
};

