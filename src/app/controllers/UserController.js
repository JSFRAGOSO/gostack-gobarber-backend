import User from '../models/User';

class UserController {
    async store(req, res) {
        const userExists = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const { id, name, email, provider } = await User.create(req.body);

        return res.json({ id, name, email, provider });
    }

    async update(req, res) {
        const user = await User.findByPk(req.userId);
        const { email, oldPassword } = req.body;

        if (email && user.email !== email) {
            const userExists = await User.findOne({
                where: { email },
            });

            if (userExists) {
                return res
                    .status(400)
                    .json({ message: 'E-mail already exists' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        const { id, name, provider } = await user.update(req.body);

        return res.json({ id, name, email, provider });
    }
}

export default new UserController();
