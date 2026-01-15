import { Member, Ministry, Finance, Event, Presence, User } from "../models/index.js";
import bcrypt from 'bcryptjs';

/* Initialize database tables */
await Member.sync();
await Ministry.sync();
await Finance.sync();
await Event.sync();
await Presence.sync();
await User.sync();

/* Create superuser if it doesn't exist */
const superuserEmail = process.env.SUPERUSER_EMAIL || "admin@church.com";
const superuserUsername = process.env.SUPERUSER_USERNAME || "admin";
const superuserPassword = process.env.SUPERUSER_PASSWORD || "admin123";

try {
    const existingUser = await User.findOne({ where: { email: superuserEmail } });

    if (!existingUser) {
        const hashedPassword = await bcrypt.hash(superuserPassword, 10);

        await User.create({
            username: superuserUsername,
            password: hashedPassword,
            email: superuserEmail,
            role: 'admin',
            is_active: true
        });

        console.log("✓ Superusuário criado com sucesso!");
    } else {
        console.log("✓ Superusuário já existe no sistema");
    }
} catch (error) {
    console.error("Erro ao criar superusuário:", error.message);
}

