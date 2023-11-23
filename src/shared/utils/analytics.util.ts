import { Document, Model } from 'mongoose';
import { MonthlyData } from '../interfaces/analytics.interface';
import { Last12MonthsData } from '../interfaces/analytics.interface';

export const generateLast12MonthsData = async <T extends Document>(
  model: Model<T>,
): Promise<Last12MonthsData> => {
  const last12MonthsData: MonthlyData[] = [];
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() + 1);

  for (let index = 11; index >= 0; index--) {
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - index * 28,
    );

    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 28,
    );

    const monthYear = endDate.toLocaleString('default', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const documentsCount = await model.countDocuments({
      createdAt: { $gte: startDate, $lt: endDate },
    });

    last12MonthsData.push({ month: monthYear, count: documentsCount });
  }

  return { last12MonthsData };
};
