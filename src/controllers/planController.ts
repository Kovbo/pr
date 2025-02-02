import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createPlan = async (req: Request, res: Response) => {
  const { title, description, userId, planType } = req.body;
  try {
    const newPlan = await prisma.plan.create({
      data: {
        title,
        description,
        userId,
        planType,
      },
    });
    res.send(newPlan);
  } catch (error: any) {
    res.status(500).send({
      message: error.message || 'Some error occurred while creating the Plan.',
    });
  }
};

const getPlansByUserIdAndType = async (req: Request, res: Response) => {
  const { userId, planType } = req.params;
  try {
    const plans = await prisma.plan.findMany({
      where: {
        userId: parseInt(userId),
        planType: planType,
      },
    });
    res.send(plans);
  } catch (error: any) {
    res.status(500).send({
      message: error.message || 'Some error occurred while retrieving plans.',
    });
  }
};

export { createPlan, getPlansByUserIdAndType };
