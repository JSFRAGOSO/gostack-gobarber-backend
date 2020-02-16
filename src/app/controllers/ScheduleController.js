import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

class ScheduleController {
    async index(req, res) {
        const { userId: provider_id } = req;

        const { provider } = await User.findByPk(provider_id);
        if (!provider) {
            return res.status(401).json({ error: 'User is not a provider' });
        }

        const { date } = req.query;

        const parsedDate = parseISO(date);

        const appointments = await Appointment.findAll({
            where: {
                provider_id,
                canceledAt: null,
                date: {
                    [Op.between]: [
                        startOfDay(parsedDate),
                        endOfDay(parsedDate),
                    ],
                },
            },
            order: ['date'],
        });

        return res.json(appointments);
    }
}
export default new ScheduleController();
