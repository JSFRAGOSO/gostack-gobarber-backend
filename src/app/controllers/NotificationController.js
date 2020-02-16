import Notification from '../schemas/Notification';

class NotificationController {
    async index(req, res) {
        const { userId: user } = req;

        const notifications = await Notification.find({ user })
            .sort('-createdAt')
            .limit(20);
        return res.json(notifications);
    }

    async update(req, res) {
        const { notificationId } = req.params;
        const { markRead } = req.body;

        const notification = await Notification.findByIdAndUpdate(
            notificationId,
            {
                read: markRead,
            },
            { new: true }
        );
        return res.json(notification);
    }
}

export default new NotificationController();
